import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const API_URL = '/api/'

export default new Vuex.Store({
  state: {
    slides: [],
    departments: [],
    categories: [],
    employees: [],
    documents: [],
    results: [],
  },
  mutations: {
    SET_SLIDES: (state, payloads) => {
      state.slides = payloads
    },
    SET_DEPARTMENTS: (state, payloads) => {
      state.departments = payloads
    },
    SET_CATEGORIES: (state, payloads) => {
      state.categories = payloads
    },
    SET_EMPLOYEES: (state, payloads) => {
      state.employees = payloads
    },
    SET_DOCUMENTS: (state, payloads) => {
      state.documents = payloads
    },
    SET_RESULTS: (state, payloads) => {
      state.results = payloads
    },
  },
  actions: {
    fetchSlides({ commit }) {
      return window.axios
        .get(API_URL + 'slideshow')
        .then((response) => {
          let data = response.data
          commit('SET_SLIDES', data)
          return Promise.resolve(data)
        })
        .catch((error) => {
          return Promise.reject(error)
        })
    },
    fetchDepartments({ commit }) {
      return window.axios
        .get(API_URL + 'departments')
        .then((response) => {
          let data = response.data
          commit('SET_DEPARTMENTS', data)
          return Promise.resolve(data)
        })
        .catch((error) => {
          return Promise.reject(error)
        })
    },
    fetchCategories({ commit }) {
      return window.axios
        .get(API_URL + 'categories')
        .then((response) => {
          let data = response.data
          commit('SET_CATEGORIES', data)
          return Promise.resolve(data)
        })
        .catch((error) => {
          return Promise.reject(error)
        })
    },
    fetchEmployees({ commit }, [department_id, page, perPage]) {
      department_id = department_id || 0
      page = page || 0
      return window.axios
        .get(
          API_URL +
            'employees/' +
            department_id +
            '/?page=' +
            page +
            '&per_page=' +
            perPage
        )
        .then((response) => {
          let data = response.data
          commit('SET_EMPLOYEES', data.data)
          return Promise.resolve(data)
        })
        .catch((error) => {
          return Promise.reject(error)
        })
    },
    fetchDocuments({ commit }, [category_id, page, perPage]) {
      category_id = category_id || 0
      page = page || 0
      return window.axios
        .get(
          API_URL +
            'documents/' +
            category_id +
            '/?page=' +
            page +
            '&per_page=' +
            perPage
        )
        .then((response) => {
          let data = response.data
          commit('SET_DOCUMENTS', data.data)
          return Promise.resolve(data)
        })
        .catch((error) => {
          return Promise.reject(error)
        })
    },
    fetchSearch({ commit }, [payloads, page, perPage]) {
      return window.axios
        .get(
          API_URL +
            'search?q=' +
            payloads +
            '&page=' +
            page +
            '&per_page=' +
            perPage
        )
        .then((response) => {
          let data = response.data
          commit('SET_RESULTS', data.data)
          return Promise.resolve(data)
        })
        .catch((error) => {
          return Promise.reject(error)
        })
    },
  },
  getters: {
    getSlides: (state) => state.slides,
    getDepartments: (state) => state.departments,
    getCategories: (state) => state.categories,
    getEmployees: (state) => state.employees,
    getDocuments: (state) => state.documents,
    getResults: (state) => state.results,
  },
})
