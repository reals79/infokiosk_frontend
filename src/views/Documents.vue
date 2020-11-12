<template>
  <div>
    <b-carousel-list
      v-model="category"
      :data="getCategories"
      :arrow-hover="false"
      :items-to-show="catPerList"
      class="has-shadow"
      icon-size="is-medium"
    >
      <template slot="item" slot-scope="list">
        <div class="card mx-2 has-background-info has-text-white has-text-centered is-clickable" @click="category = list.index; loadDocuments(list.id)">
          <div class="card-content p-2">
            <p>
                {{ list.name }}
            </p>
          </div>
        </div>
      </template>
    </b-carousel-list>
    <br>
    <b-table
      :data="getDocuments"
      :loading="loading"
      ref="tableDocuments"
      paginated
      :per-page="perPage"
      detailed
      detail-key="id"
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

      <b-table-column field="name" v-slot="props">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ props.row.name }}</p>
            <p class="subtitle is-6"><span class="is-italic">Categoria:</span> <span class="is-uppercase">{{ props.row.category.name }}</span></p>
          </div>
        </div>
      </b-table-column>

      <template slot="detail" slot-scope="props">
        <article class="media">
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
      <template v-if="!loading" slot="empty">
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

    <b-modal 
        v-model="isViewPDF"
        has-modal-card
        trap-focus
        scroll="keep"
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-modal>
        <template>
          <pdf v-if="pdf_file" :src="pdf_file"></pdf>
        </template>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";
import pdf from 'vue-pdf';

export default {
  name: "Documents",
  components: {
    pdf
  },
  data: () => ({
    category: 0,
    category_id: 0,
    catPerList: 5,
    perPage: 5,
    loading: false,
    total: 0,
    page: 1,
    isViewPDF: false,
    pdf_file: null,
  }),
  computed: {
    ...mapGetters(["getCategories", "getDocuments"])
  },
  methods: {
    ...mapActions(["fetchCategories", "fetchDocuments"]),
    loadDocuments(document_id) {
      this.loading = true;
      this.document_id = document_id;
      this.fetchDocuments([document_id, this.page, this.perPage]).then((data) => {
        this.loading = false;
        this.total = data.total;
      }).catch((error) => {
        this.total = 0
        this.loading = false
      });
    },
    onPageChange(page) {
        this.page = page
        this.loadDocuments(this.document_id)
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
  mounted() {
    this.fetchCategories();
    this.loadDocuments();
  },
};
</script>
