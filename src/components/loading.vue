<template>
  <div class="loading_wrapper">
    <img :src="loadingGif" alt />
  </div>
</template>

<script>
import loadingGif from "../pages/index/assets/loading.gif";
export default {
  name: "loading",
  data() {
    return {
      loadingGif
    };
  }
};
</script>

<style scoped>
.loading_wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
