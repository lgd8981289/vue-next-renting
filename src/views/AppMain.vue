<template>
  <div class="app-main">
    <div class="content">
      <component :is="currentComponent" />
    </div>
    <van-tabbar v-model="currentComponent">
      <van-tabbar-item name="home">
        <span>首页</span>
        <template #icon>
          <i class="iconfont iconshouye"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="map">
        <span>地图找房</span>
        <template #icon>
          <i class="iconfont iconditu"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Home from './home/Main.vue';
import Map from './map/Main.vue';
export default {
  name: 'AppMain',
  components: {
    Home,
    Map
  },
  data: function () {
    return {
      currentComponent: 'home'
    };
  },
  created() {
    this.$emitter.on('toMap', () => {
      this.currentComponent = 'map';
    });
  }
};
</script>

<style scoped lang="scss">
.app-main {
  height: 100vh;
  .content {
    box-sizing: border-box;
    height: 100%;
    padding-bottom: 50px;
  }
}
</style>
