import element from './form.html';
import http from '@/services/http';
import axios from 'axios'
import weui from '@/services/weui/weui.js';
import Vue from 'vue';
console.log(weui);


export default {
	template: element,
	methods: {
		eidt:function(id){
			this.$router.push({ name: 'RssDetail', params: { id: id }})
		},
		create:function(){
			this.$router.push({ name: 'RssDetail', params: { id: 0 }})
			console.log('!!!');
		},
		  handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this.searchData(this.searchOption.pageSize,val);

		  },
		  searchData(pageSize,pageNumber){
			http.get('api/infomation/list?pageSize='+pageSize+'&pageNumber='+pageNumber).then((res) => {
				this.searchOption.total = res.data.total;
				this.tableData = res.data.data;
			})
		  }
	},
	data() {
		return {
			tableData: [],
			searchOption:{
				pageSize:10,
				pageNumber:1,
			}

		}
	},
	created: function() {
		http.get('api/infomation/list').then((res) => {
			axios.defaults.headers.projectId = "4535645";
			console.log(res);
			this.searchOption.total = res.data.total;
			this.tableData = res.data.data;
		})
	}
	
}
