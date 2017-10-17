<template>
  <script  type="text/plain" style="width:1024px;height:500px;"></script>
</template>

<script>
// import parent from './Parent'
// import child from './child'




export default {
  name: 'hello',
  props:[value,width,height],
  data () {
    return {
      id:'editor'+Math.random(100),
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:()=>{
    console.log(this.$el)
    this.$els.script.id = this.id;
    this.ue = UE.getEditor('editor');
    setContent:(content,flog=false) =>{
      this.ue.setContent(content,flog);
    }
  },
  watch:{
    value:(newValue,oldValue) =>{
      this.setContent(newValue);
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
