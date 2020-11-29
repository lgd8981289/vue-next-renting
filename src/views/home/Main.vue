<template>
  <div class="home">
    <floor-scroll
      v-model="isReachFloor"
      :isScroll="contentScrollTop === 0"
      @onMove="onFloorMoveEvent"
      @reachFloor="onReachFloor"
    >
      <!-- 二楼 -->
      <template #floor>
        <div class="floor-container"></div>
      </template>
      <!-- 一楼 -->
      <template #default>
        <div>
          <!-- 选项区 -->
          <home-options></home-options>
          <!-- 新闻区 -->
          <home-news></home-news>
          <!-- 房产列表 -->
          <home-tabs></home-tabs>
        </div>
      </template>
    </floor-scroll>
  </div>
</template>

<script>
import FloorScroll from '/@components/FloorScroll.vue';
import HomeOptions from './components/HomeOptions.vue';
import HomeNews from './components/HomeNews.vue';
import HomeTabs from './components/HomeTabs.vue';
export default {
  name: 'Home',
  components: {
    FloorScroll,
    HomeOptions,
    HomeNews,
    HomeTabs
  },
  data() {
    return {
      // 是否已进入二楼
      isReachFloor: false,
      // 一楼滚动距离
      contentScrollTop: 0,
      // 楼层拖动的距离
      floorScrollDiff: 0,
      // 楼层距离进入二楼节点的百分比
      floorScrollRatio: 0
    };
  },
  methods: {
    /**
     * 监听 content 的滚动
     */
    onContentScrollEvent($event) {
      this.contentScrollTop = $event.target.scrollTop;
    },
    /**
     * 楼层拖动时的回调
     * @param {*} diff 拖动的距离
     * @param {*} ratio 距离进入二楼节点的百分比
     */
    onFloorMoveEvent(diff, ratio) {
      this.floorScrollDiff = diff;
      this.floorScrollRatio = ratio;
    },
    /**
     * 进入二楼之后调用
     */
    onReachFloor() {
      this.isReachFloor = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  .floor-container {
    height: 100vh;
    width: 100%;
    background-color: aquamarine;
  }
}
</style>
