<template>
  <div class="home-options">
    <van-swipe v-if="dataSource.length > 0" class="home-options-swiper" indicator-color="black">
      <van-swipe-item v-for="(page, pageIndex) in dataSource" :key="pageIndex">
        <home-options-item
          v-for="(item, index) in page"
          :key="index"
          :data="item"
        ></home-options-item>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { getOptions } from '/@api/options';
import HomeOptionsItem from './HomeOptionsItem.vue';
export default {
  name: 'HomeOptions',
  components: {
    HomeOptionsItem
  },
  data: function () {
    return {
      PAGE_NUM: 10,
      dataSource: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const data = await getOptions();
      // 对数据进行处理 ， 以 PAGE_NUM 进行分页
      let pageDatas = [];
      data.forEach((item, index) => {
        pageDatas.push(item);
        if ((index + 1) % this.PAGE_NUM === 0 || index === data.length - 1) {
          this.dataSource.push(pageDatas);
          pageDatas = [];
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.home-options {
  &-swiper {
    height: 180px;
    background-color: white;
  }
  .van-swipe-item {
    text-align: center;
    display: flex;
    flex-wrap: wrap;
  }
  .van-swipe__indicators {
    bottom: 0;
  }
}
</style>
