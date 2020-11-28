<template>
  <div class="home-news">
    <div class="home-news-title">
      <span class="home-news-title-time">{{ time }}</span>
    </div>
    <div class="home-news-list">
      <news-swiper :num="2" :data="newsData"></news-swiper>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { getNews } from '/@api/news';
import NewsSwiper from '/@components/NewsSwiper.vue';
export default {
  name: 'HomeNews',
  components: {
    NewsSwiper
  },
  data() {
    return {
      time: dayjs().format('MM月DD日'),
      newsData: []
    };
  },
  created() {
    this.loadNewsData();
  },
  methods: {
    async loadNewsData() {
      this.newsData = await getNews();
    }
  }
};
</script>

<style lang="scss" scoped>
.home-news {
  display: flex;
  background-color: white;
  padding: 8px 16px;
  height: 58px;
  &-title {
    width: 25%;
    background-image: url('../../../assets/img/tou_tiao.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    &-time {
      position: absolute;
      font-size: 12px;
      font-weight: 400;
      right: 14px;
      bottom: 8px;
      background-color: #26ce97;
      transform: skew(-18deg);
      padding: 2px;
      color: white;
    }
  }
  &-list {
    width: 75%;
    padding-left: 16px;
    box-sizing: border-box;
  }
}
</style>
