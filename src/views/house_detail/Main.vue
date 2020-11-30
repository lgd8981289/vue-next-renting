<template>
  <div class="house-detail">
    <div class="house-detail-container" v-if="detailData">
      <!-- navBar -->
      <house-detail-nav-bar :title="detailData.name"></house-detail-nav-bar>
      <!-- swiper -->
      <house-detail-swiper :data="detailData"></house-detail-swiper>
      <!-- 描述文本 -->
      <house-detail-desc :data="detailData"></house-detail-desc>
    </div>
  </div>
</template>

<script>
import HouseDetailNavBar from './components/HouseDetailNavBar.vue';
import HouseDetailSwiper from './components/HouseDetailSwiper.vue';
import HouseDetailDesc from './components/HouseDetailDesc.vue';
import { getHouse } from '/@api/house';
export default {
  name: 'HouseDetail',
  components: {
    HouseDetailNavBar,
    HouseDetailSwiper,
    HouseDetailDesc
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

<style lang="scss" scoped></style>
