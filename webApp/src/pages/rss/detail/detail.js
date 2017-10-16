import element from './detail.html';
import http from '@/services/http';
import axios from 'axios'

import './detail.scss'
export default {
    template: element,
    data() {
      return {
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
        infomation:{
            author:'',
            created:'',
            description:'',
            link:'',
            pubDate:'',
            title:'',
            _id:'' 
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    },
    created:function(){
        http.get('api/infomation/detail/'+this.$route.params.id).then((res) => {
			axios.defaults.headers.projectId = "4535645";
			this.infomation = res.data;
		})
    }
  }