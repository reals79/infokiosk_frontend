<template>
  <div>
    <section class="hero is-fullheight">
      <div class="hero-head">
        <Toolbar />
      </div>

      <!-- Hero content: will be in the middle -->
      <div class="hero-body is-align-items-start pt-3">
        <div class="container">
          <router-view></router-view>
        </div>
      </div>

    </section>
  </div>
</template>

<script>
import Toolbar from "./components/Toolbar";

export default {
  name: "App",

  components: {
    Toolbar
  },

  data: () => ({
    //
  })
};
</script>
