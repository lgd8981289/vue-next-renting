<template>
  <div class="home">
    <!-- 选项区 -->
    <home-options></home-options>
    <!-- 新闻区 -->
    <home-news></home-news>
    <!-- 房产列表 -->
    <home-tabs></home-tabs>
  </div>
</template>

<script>
import HomeOptions from './components/HomeOptions.vue';
import HomeNews from './components/HomeNews.vue';
import HomeTabs from './components/HomeTabs.vue';
export default {
  name: 'Home',
  components: {
    HomeOptions,
    HomeNews,
    HomeTabs
  }
};
</script>

<style lang="scss" scoped></style>
