<template>
  <div class="child">
    <span>{{msg}}</span>  
  </div>
</template>

<script>
export default {
  name: 'child',
  data () {
    return {
      msg: 'i an child!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
