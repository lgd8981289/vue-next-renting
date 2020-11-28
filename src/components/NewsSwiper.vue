<template>
  <div class="news-swiper">
    <van-swipe
      v-if="data.length > 0"
      :style="{ height: '100%' }"
      :autoplay="5000"
      :touchable="false"
      :show-indicators="false"
      vertical
      loop
    >
      <van-swipe-item v-for="(pageData, pageIndex) in dataSource" :key="pageIndex">
        <p class="single-line" v-for="(item, index) in pageData" :key="index">{{ item.title }}</p>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Swiper } from 'swiper';
import { nextTick } from 'vue';

export default {
  name: 'NewsSwiper',
  props: {
    // 同屏新闻的数量
    num: {
      type: Number,
      default: 2
    },
    data: {
      type: Array
    }
  },
  data() {
    return {
      dataSource: []
    };
  },
  methods: {
    initSlideData() {
      // 对数据进行处理 ， 以 PAGE_NUM 进行分页
      let pageDatas = [];
      this.data.forEach((item, index) => {
        pageDatas.push(item);
        if ((index + 1) % this.num === 0 || index === this.data.length - 1) {
          this.dataSource.push(pageDatas);
          pageDatas = [];
        }
      });
    }
  },
  watch: {
    data: {
      handler(val) {
        this.initSlideData();
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.news-swiper {
  height: 100%;
  overflow: hidden;
  font-size: 14px;
  color: #4f5255;
  .van-swipe-item {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
</style>
