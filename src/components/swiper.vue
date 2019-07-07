<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swp-page swiper-slide" v-for="list in lists">
        <a class="js-no-follow" :href="list.clickUrl">
          <img class="goods-main-photo fadeIn" :src="list.img"/>
        </a>
      </div>
    </div>
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <!-- <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div> -->
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
export default {
  name: "Swiper",
  props: {
    lists: {
      type: Array,
      required: true
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      new Swiper(".swiper-container", {
        loop: true, // 循环模式选项
        autoplay: true, //等同于以下设置
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination"
        },
        // 如果需要前进后退按钮
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev"
        // }
      });
    });
  },
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.swiper-slide img {
  height: 100%;
  width: 100%;
}
.swiper-container {
  width: 100%;
  height: 100%;
}
</style>