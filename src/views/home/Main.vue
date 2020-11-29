<template>
  <div class="home">
    <home-nav-bar
      @heightChange="navBarHeightChange"
      :contentScrollTop="contentScrollTop"
      :floorScrollRatio="floorScrollRatio"
      :floorScrollDiff="floorScrollDiff"
    >
    </home-nav-bar>
    <floor-scroll
      v-model="isReachFloor"
      :isScroll="contentScrollTop === 0"
      :tipsStyle="{ top: navBarHeight + 'px' }"
      @onMove="onFloorMoveEvent"
      @reachFloor="onReachFloor"
    >
      <!-- 二楼 -->
      <template #floor>
        <div class="floor-container">
          <van-image
            class="floor-container-bg"
            src="http://res.lgdsunday.club/renting_floor_bg.jpg"
            fit="cover"
          ></van-image>
        </div>
      </template>
      <!-- 一楼 -->
      <template #default>
        <div
          class="content-container"
          ref="content"
          @scroll="onContentScrollEvent"
          :style="{ top: navBarHeight + 'px' }"
        >
          <!-- 选项区 -->
          <home-options></home-options>
          <!-- 新闻区 -->
          <home-news></home-news>
          <!-- 房产列表 -->
          <home-tabs></home-tabs>
        </div>
      </template>
    </floor-scroll>
    <van-popup v-model:show="isReachFloor" position="bottom" :style="{ height: '100%' }">
      <van-button type="primary" @click="isReachFloor = !isReachFloor"
        >已经入二楼，在此可处理响应业务，点击返回一楼</van-button
      >
    </van-popup>
  </div>
</template>

<script>
import FloorScroll from '/@components/FloorScroll.vue';
import HomeNavBar from './components/HomeNavBar.vue';
import HomeOptions from './components/HomeOptions.vue';
import HomeNews from './components/HomeNews.vue';
import HomeTabs from './components/HomeTabs.vue';
export default {
  name: 'Home',
  components: {
    FloorScroll,
    HomeNavBar,
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
      floorScrollRatio: 0,
      // navbar 的高度
      navBarHeight: 0
    };
  },
  methods: {
    /**
     * 监听 content 的滚动
     */
    onContentScrollEvent($event) {
      this.contentScrollTop = $event.target.scrollTop;
      console.log(this.contentScrollTop);
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
    },
    /**
     * 监听 navbar 的变化
     */
    navBarHeightChange(height) {
      this.navBarHeight = height;
    }
  },
  activated() {
    this.$refs.content.scrollTop = this.contentScrollTop;
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

  .content-container {
    height: 100vh;
    width: 100%;
    background-color: #f4f4f4;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    position: relative;
    box-sizing: border-box;
    padding-bottom: 62px;
  }
}
</style>
