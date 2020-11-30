<template>
  <div class="house-detail" @scroll="onScroll" ref="houseDetail">
    <div class="house-detail-container" v-if="detailData">
      <!-- navBar -->
      <house-detail-nav-bar :title="detailData.name" :style="navBarStyle"></house-detail-nav-bar>
      <!-- swiper -->
      <house-detail-swiper :data="detailData"></house-detail-swiper>
      <!-- 描述文本 -->
      <house-detail-desc :data="detailData"></house-detail-desc>
      <!-- 路线规划 -->
      <house-detail-map :data="detailData"></house-detail-map>
      <!-- 推荐楼盘 -->
      <home-room-list type="2" :houseId="$route.query.houseId"></home-room-list>
    </div>
  </div>
</template>

<script>
// 滚动渐变极限
const SCROLL_CHANGE_HEIGHT = 280;
import HouseDetailNavBar from './components/HouseDetailNavBar.vue';
import HouseDetailSwiper from './components/HouseDetailSwiper.vue';
import HouseDetailDesc from './components/HouseDetailDesc.vue';
import HouseDetailMap from './components/HouseDetailMap.vue';
import HomeRoomList from '/@components/RoomList.vue';
import { getHouse } from '/@api/house';
export default {
  name: 'HouseDetail',
  components: {
    HouseDetailNavBar,
    HouseDetailSwiper,
    HouseDetailDesc,
    HouseDetailMap,
    HomeRoomList
  },
  data() {
    return {
      detailData: null,
      scrollTop: 0,
      navBarStyle: {
        backgroundColor: 'rgba(38, 206, 151, 0)'
      }
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.detailData = await getHouse({
        houseId: this.$route.query.houseId
      });
    },
    onScroll(event) {
      this.scrollTop = event.target.scrollTop;
      this.navBarStyle.backgroundColor = `rgba(38, 206, 151, ${
        this.scrollTop / SCROLL_CHANGE_HEIGHT
      })`;
    }
  },
  activated() {
    this.$refs.houseDetail.scrollTop = this.scrollTop;
  }
};
</script>

<style lang="scss" scoped>
@import 'src/assets/css/constant.scss';
.house-detail {
  position: absolute;
  top: 0;
  height: 100vh;
  overflow-y: scroll;
  &-container {
    width: 100vw;
  }
}
</style>
