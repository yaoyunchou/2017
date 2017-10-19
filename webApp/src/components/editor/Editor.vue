<template>
  <div class="eidt">
    <script :id="id" type="text/plain" v-bind:style="{ width: width?width+'px':'600px', height: height?height+'px':'300px', }"></script>
  </div>
</template>

<script>
// import parent from './Parent'
// import child from './child'


var ue;
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
      id: 'editor' + Math.random(100)
    }
  },
  methods: {
    updataValue: function(value) {
      this.$emit('input', value)
    }
  },
  watch: {
    value: function(newValue) {
      if (this.ue) {
        ue.ready(() => {
          self.ue.setContent(newValue, true);
        })
      }

    }
  },
  mounted: function() {
    var self = this;
    ue = UE.getEditor(self.id);
    ue.ready(() => {
      self.ue = ue;
      self.ue.setContent(self.value, true);

      self.ue.addListener('contentChange', function(editor) {
        self.updataValue(self.ue.getContent())
      });
    });

  },
  created: function() {

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
