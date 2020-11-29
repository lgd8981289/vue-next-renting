<template>
  <div class="home-card">
    <i class="iconfont iconsousuo"></i>
    <span>renting - 高品质移动应用</span>
    <i class="iconfont iconyduierweimasaomiao"></i>
  </div>
</template>

<script>
export default {
  name: 'HomeCard'
};
</script>

<style lang="scss" scoped>
.home-card {
  background-color: white;
  height: 32px;
  position: relative;
  color: #8a8a8a;
  font-size: 12px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    margin-left: 6px;
  }

  .iconyduierweimasaomiao {
    position: absolute;
    right: 8px;
  }
}
</style>
