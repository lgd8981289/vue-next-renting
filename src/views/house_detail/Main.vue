<template>
  <div class="house-detail">
    <div class="house-detail-container" v-if="detailData">
      <!-- navBar -->
      <house-detail-nav-bar :title="detailData.name"></house-detail-nav-bar>
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
      detailData: null
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
    }
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
