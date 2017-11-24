import element from './detail.html';
import http from '@/services/http';
import Editor from "@/components/editor/Editor.vue";
import CkEditor from "@/components/ckEditor/ckEditor.js";

import './detail.scss'
export default {
	template: element,
	components: {
		'editor': Editor,
		'ckEditor': CkEditor
	},
	data() {
		return {
			day: '',
			time: '',
			form: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			},
			infomation: {
				author: '',
				created: '',
				description: '',
				link: '',
				pubDate: '',
				title: '',
				_id: ''
			}
		}
	},
	computed: {
		date: {
			get: function() {
				return this.day + "" + this.time;
			},
			set: function(newValue) {
				if(!newValue||!newValue.length){
					return;
				}
				var date = newValue.split(' ');
				this.day = date[0];
				this.time = date[1];
			}
		}
	},
	methods: {
		onSubmit() {
			console.log('submit!');
			http.post('api/infomation/saveInfoMation', this.infomation).then(function(data) {
				console.log(data);
			});
		}
	},
	created: function() {
    console.log(!this.$route.params.id);
		if (this.$route.params.id!=='0') {
      http.get('api/infomation/detail/' + this.$route.params.id).then((res) => {
        this.infomation = res.data;
        this.date = res.data.created;
      })
		}else{
      http.get('api/infomation/create').then((res) => {
        this.infomation = res.data;
        this.date = new Date();
      })
    }
		
	}
}
