<template>
  <div id="header">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default class About extends Vue {
  

  mounted() {
    console.log(11111)
  }
}
</script>


<style lang="less" scoped>
#header {
  h1 {
    font-size: 26px;
    font-weight: bold;
  }
  p { font-size: 12px;
    a { text-decoration: none;
      &:hover { border-width: 1px }
    }
  }
}
</style>


