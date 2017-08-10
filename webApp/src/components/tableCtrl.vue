 <template>
  <div>
    <el-button @click="handleClick(scope.row._id)" type="text" size="small">查看</el-button>
    <el-button type="text" size="small">编辑</el-button>
  </div>
</template>

<script>
export default {
  name: 'tableCtrl',
  props:['handleClick'],
  data() {
    return {
      
    }
  }

}
</script>
