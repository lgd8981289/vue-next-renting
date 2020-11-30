<template>
  <div class="house-detail">
    <div class="house-detail-container" v-if="detailData">
      <!-- navBar -->
      <house-detail-nav-bar :title="detailData.name"></house-detail-nav-bar>
    </div>
  </div>
</template>

<script>
import HouseDetailNavBar from './components/HouseDetailNavBar.vue';
import { getHouse } from '/@api/house';
export default {
  name: 'HouseDetail',
  components: {
    HouseDetailNavBar
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
