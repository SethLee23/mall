<template>
  <div class="container-bottom-menu" style="cursor:pointer;">
    <div class="container" style="min-height: 597px;">
      <div
        class="block-list address-list section section-first js-no-webview-block"
        v-for="(item,index) in list"
        :key="item.id"
      >
        <a
          class="block-item js-address-item address-item"
          :class="{'address-item-default':item.isDefault}"
          @click="editAddress(item,index)"
        >
          <div class="address-title">{{item.name}} {{item.tel}}</div>
          <p>{{item.provinceName}}{{item.cityName}}{{item.districtName}}{{item.address}}</p>
        </a>
      </div>
      <div class="block stick-bottom-row center">
        <router-link
          class="btn btn-blue js-no-webview-block js-add-address-btn"
          :to="{name:'form',query:{type:'add'}}"
        >新增地址</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { url, axios } from 'js/entrance.js'
export default {
  data() {
    return {
      list: null
    };
  },
  created() {
    this.getAddressLists();
  },
  methods: {
    getAddressLists() {
      axios.get(url.addressLists).then(res => {
        this.list = res.data.lists;
      });
    },
    editAddress(item, index) {
      this.$router.push({
        name: "form",
        query: { type: "edit", instance: item }
      });
    }
  }
};
</script>

<style scoped>
@import "./address_base.css";
@import "./address.css";
* {
  margin: 0;
  padding: 0;
}
</style>

