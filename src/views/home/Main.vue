<template>
  <div class="home">
    <!-- 选项区 -->
    <home-options></home-options>
    <!-- 新闻区 -->
    <home-news></home-news>
  </div>
</template>

<script>
import HomeOptions from './components/HomeOptions.vue';
import HomeNews from './components/HomeNews.vue';
export default {
  name: 'Home',
  components: {
    HomeOptions,
    HomeNews
  }
};
</script>

<style lang="scss" scoped></style>
