<template>
  <div>
    <b-carousel-list
      v-model="department"
      :data="getDepartments"
      :arrow-hover="false"
      :items-to-show="depPerList"
      class="has-shadow"
      icon-size="is-medium"
    >
      <template slot="item" slot-scope="list">
        <div class="card mx-2 has-background-info has-text-white has-text-centered is-clickable" @click="department = list.index; loadEmployees(list.id)">
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
      :data="getEmployees"
      :loading="loading"
      ref="tableEmployees"
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

      <b-table-column field="full_name" v-slot="props">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">{{ props.row.full_name }}</p>
                <p class="subtitle is-6"><span class="is-italic">Birou:</span> <span class="is-uppercase">{{ props.row.position }}</span> <span class="mx-4">|</span> <span class="is-italic">Departament:</span> <span class="is-uppercase">{{ props.row.department.name }}</span></p>
              </div>
            </div>
      </b-table-column>

      <template slot="detail" slot-scope="props">
          <article class="media">
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
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Employees",
  components: {
    
  },
  data: () => ({
    department: 0,
    department_id: 0,
    depPerList: 5,
    perPage: 5,
    loading: false,
    total: 0,
    page: 1,
  }),
  computed: {
    ...mapGetters(["getDepartments", "getEmployees"])
  },
  methods: {
    ...mapActions(["fetchDepartments", "fetchEmployees"]),
    loadEmployees(department_id) {
      this.loading = true;
      this.department_id = department_id;
      this.fetchEmployees([department_id, this.page, this.perPage]).then((data) => {
        this.loading = false;
        this.total = data.total;
      }).catch((error) => {
        this.total = 0
        this.loading = false
      });
    },
    onPageChange(page) {
        this.page = page
        this.loadEmployees(this.department_id)
    },
  },
  mounted() {
    this.fetchDepartments();
    this.loadEmployees();
  },
};
</script>
