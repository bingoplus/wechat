<style lang="less">
    @import "./styles/index.less";
</style>
<template>
  <div id="app">
      <router-view></router-view>
      <Nav></Nav>
  </div>
</template>

<script>
import Nav from './components/nav'
export default {
  name: 'app',
  components: {
    Nav
  }
}
</script>

