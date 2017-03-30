<template>
  <a class="mint-cell">
    <div class="mint-cell-wrapper">
      <div class="mint-cell-title pl54">
        <slot>
          <span class="mint-cell-text" v-text="value"></span>
        </slot>
      </div>
    </div>
  </a>
</template>
<script>
  export default{
    name: 'Cell',
    props: {
      value: {}
    }
  }
</script>
