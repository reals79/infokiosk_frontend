<template>
  <div>
    <b-modal
      v-model="isShowSlideshow"
      has-modal-card
      full-screen
      @close="closeSlideshow"
    >
      <b-carousel :arrow="false" :pause-hover="false" :indicator="false">
        <b-carousel-item v-for="(slide, i) in getSlides" :key="i">
          <section class="hero is-fullheight has-background-black">
            <div
              class="hero-body has-text-centered p-0 image-bg"
              :style="`background-image: url(/storage/` + slide.cover + `)`"
              @click="
                isShowSlideshow = false
                closeSlideshow()
              "
            ></div>
          </section>
        </b-carousel-item>
      </b-carousel>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Slideshow',
  components: {},
  data: () => ({
    //
    isShowSlideshow: true,
  }),
  computed: {
    ...mapGetters(['getSlides']),
  },
  mounted() {
    this.fetchSlides()
    this.$root.$data.isSlideshow = true
  },
  methods: {
    ...mapActions(['fetchSlides']),
    closeSlideshow() {
      this.$router.push({ name: 'Search' })
      this.$root.$data.isSlideshow = false
    },
  },
}
</script>
<style scoped>
div.image-bg {
  width: 100%;
  height: 100%;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
