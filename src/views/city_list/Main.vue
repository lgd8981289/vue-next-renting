<template>
  <div class="city-list">
    <nav-bar></nav-bar>
    <div class="city-list-container"></div>
  </div>
</template>

<script>
import NavBar from './components/CityListNavBar.vue';
export default {
  name: '',
  components: {
    NavBar
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
