<template>
  <div>
    <b-field>
        <b-input v-model="query"
          placeholder="Căutare..."
          type="search"
          icon="magnify"
          @focus="showKeyboard"
          expanded>
        </b-input>
        <p class="control">
            <b-button @click="doSearch" :loading="loading" class="button is-primary">Search</b-button>
        </p>
    </b-field>
    <vue-touch-keyboard v-if="visibleKeyboard" :options="optionsKeyboard" :layout="layoutKeyboard" :cancel="hideKeyboard" :accept="hideKeyboard" :input="inputKeyboard" />
    
    <br>
    <b-table
      :data="getResults"
      :loading="loading"
      ref="tableResults"
      paginated
      :per-page="perPage"
      detailed
      detail-key="rownum"
      show-detail-icon
      :show-header="false"
      striped
      backend-pagination
      :total="total"
      @page-change="onPageChange"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page">
      
      <b-table-column v-slot="props">
          <template v-if="props.row.employee_id">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">{{ props.row.fullname }}</p>
                <p class="subtitle is-6"><span class="is-italic">Birou:</span> <span class="is-uppercase">{{ props.row.position }}</span> <span class="mx-4">|</span> <span class="is-italic">Departament:</span> <span class="is-uppercase">{{ props.row.department_name }}</span></p>
              </div>
            </div>
          </template>
          <template v-if="props.row.document_id">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">{{ props.row.document_name }}</p>
                <p class="subtitle is-6"><span class="is-italic">Categoria:</span> <span class="is-uppercase">{{ props.row.category_name }}</span></p>
              </div>
            </div>
          </template>
      </b-table-column>

      <template slot="detail" slot-scope="props">
        <article v-if="props.row.employee_id" class="media">
            <figure class="media-left">
                <p class="image is-64x64">
                    <img v-if="props.row.avatar" :src="'storage/' + props.row.avatar">
                    <img v-else src="../assets/no-avatar.png">
                </p>
            </figure>
            <div class="media-content">
              <p v-if="props.row.phone" class="subtitle"><span class="is-italic">Telefon:</span> <span class="has-text-weight-medium">{{ props.row.phone }}</span></p>
              <p class="content">
                {{ props.row.comment }}
              </p>
            </div>
        </article>
        <article v-if="props.row.document_id" class="media">
          <figure class="media-left">
            <p class="image is-64x64">
              <b-button type="is-text" class="mt-4 is-size-7" @click="viewDocument(props.row)">
                <img :src="getDocumentType(props.row.file_mimetype)">
                vedere
              </b-button>
            </p>
          </figure>
          <div class="media-content">
            <p v-if="props.row.description" class="subtitle"><span>{{ props.row.description }}</span></p>
            <p class="content">
              {{ props.row.comment }}
            </p>
          </div>
        </article>
      </template>

      <template v-if="fetched && !loading" slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon icon="emoticon-sad" size="is-large"></b-icon>
            </p>
            <p>Nimic aici.</p>
          </div>
        </section>
      </template>
  </b-table>

  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";
import pdf from 'vue-pdf';
import layoutsKeyboard from '@/plugins/layoutsKeyboard.js';


export default {
  name: "Search",
  components: {

  },
  data: () => ({
    loading: false,
    visibleKeyboard: false,
    inputKeyboard: null,
    optionsKeyboard: {},
    layoutKeyboard: layoutsKeyboard.compactRo,
    query: "",
    depPerList: 5,
    perPage: 5,
    total: 0,
    page: 1,
    fetched: false,
  }),
  computed: {
    ...mapGetters(["getResults"]),
  },
  methods: {
    ...mapActions(["fetchSearch"]),
    showKeyboard(e) {
      this.inputKeyboard = e.target;
      if (!this.visibleKeyboard)
        this.visibleKeyboard = true;
    },
    hideKeyboard(e) {
      this.visibleKeyboard = false;
    },
    doSearch() {
      this.hideKeyboard();
      if (this.query === '')
        return;

      this.loading = true;
      this.fetchSearch([this.query, this.page, this.perPage])
        .then((data) => {
          this.loading = false;
          this.total = data.total;
        })
        .catch((error) => {
          this.loading = false;
          this.total = 0;
        });
      this.fetched = true;
    },
    onPageChange(page) {
        this.page = page;
        this.doSearch();
    },
    getDocumentType(type) {
      var document_type = "";
      if (type) {
        document_type = require('@/assets/type_unknown.png');
        if (type == 'application/pdf') {
          document_type = require('@/assets/type_pdf.png');
        } else if (type == 'image/jpeg') {
          document_type = require('@/assets/type_jpg.png');
        } else if (type == 'image/png') {
          document_type = require('@/assets/type_png.png');
        } else if (type == 'image/gif') {
          document_type = require('@/assets/type_gif.png');
        }
      }
      return document_type;
    },
    viewDocument(item) {
      if (item.file_mimetype == 'application/pdf') {
        this.pdf_file = '/storage/' + item.file;
        this.isViewPDF = true;
      } else {
        const h = this.$createElement
        const vnode = h('p', { class: "image is-4by3" }, [
            h('img', { attrs: { src: '/storage/' + item.file }})
        ])
        this.$buefy.modal.open({
            content: [ vnode ],
            scroll: "keep"
        });
      }
    }
  },
};
</script>
