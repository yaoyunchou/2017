<template>
  <div class="eidt">
    <script :id="id" type="text/plain" v-bind:style="{ width: width?width+'px':'600px', height: height?height+'px':'300px', }"></script>
  </div>
</template>

<script>
// import parent from './Parent'
// import child from './child'




export default {
  name: 'editor',
  props: {
    width: String,
    height: String,
    // 这样就允许拿 `value` 这个 prop 做其它事了
    value: String
  },
  data() {
    return {
      id: 'editor' + Math.random(100),
      isSet: false
    }
  },
  methods: {
    updataValue: function(value) {
      this.$emit('input', value)
    }
  },
  watch: {
    value: function(nv) {
      if (nv && this.ue) {
        this.ue.setContent(nv, false);
        this.isSet = true;
      }
    }
  },
  mounted: function() {
    var self = this;
    let ue = UE.getEditor(self.id);
    ue.ready(() => {
      self.ue = ue;
      if (self.value) {
        self.ue.setContent(self.value, false);
        this.isSet = true;
      }


      self.ue.addListener('contentChange', function(editor) {
        if (self.isSet && self.ue.getContent()) {
          self.updataValue(self.ue.getContent());
        }
        self.isSet = false;
      });
    });

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
