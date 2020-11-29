<template>
  <div class="city-list">
    <nav-bar></nav-bar>
    <div class="city-list-container">
      <!-- 城市列表 -->
      <index-bar></index-bar>
    </div>
  </div>
</template>

<script>
import NavBar from './components/CityListNavBar.vue';
import IndexBar from './components/IndexBar.vue';
export default {
  name: 'CityList',
  components: {
    NavBar,
    IndexBar
  }
};
</script>

<style lang="scss" scoped>
.city-list {
  position: absolute;
  top: 0;
  width: 100%;
  .van-nav-bar {
    z-index: 99;
  }
  &-container {
    height: 100vh;
    padding-top: 46px;
    box-sizing: border-box;
  }
}
</style>
