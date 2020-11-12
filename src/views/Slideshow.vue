<template>
  <div>
    <b-modal 
      v-model="isShowSlideshow"
      has-modal-card
      full-screen 
      @close="closeSlideshow">
      <b-carousel
        :pause-hover="false"
        :indicator="false"
        @click="isShowSlideshow = false; closeSlideshow();"
      >
          <b-carousel-item v-for="(slide, i) in getSlides" :key="i">
              <section class="hero is-fullheight has-background-white">
                  <div class="hero-body has-text-centered p-0">
                    <figure class="image">
                        <img :src="`/storage/` + slide.cover">
                    </figure>
                  </div>
              </section>
          </b-carousel-item>
      </b-carousel>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Slideshow",
  components: {
    
  },
  data: () => ({
    //
    isShowSlideshow: true,
  }),
  computed: {
    ...mapGetters(["getSlides"]),
  },
  mounted() {
    this.fetchSlides();
  },
  methods: {
    ...mapActions(["fetchSlides"]),
    closeSlideshow() {
      this.$router.push({name: 'Search'});
    }
  }
};
</script>
