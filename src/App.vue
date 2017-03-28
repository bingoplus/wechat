<style lang="less">
    @import "./styles/index.less";
</style>
<template>
  <div id="app">
      <div class="content">
        <router-view></router-view>
      </div>
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

