 <template>
  <div>
    <template slot scope="props">
      <el-button type="text" size="small">查看</el-button>
      <el-button type="text" size="small">编辑</el-button>
    </template>
  </div>
</template>

<script>
export default {
  name: 'table-ctrl',
  data() {
    return {
      hi: '沙发沙发上'
    }
  }

}
</script>
