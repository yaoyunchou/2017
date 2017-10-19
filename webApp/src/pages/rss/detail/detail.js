import element from './detail.html';
import http from '@/services/http';
import  Editor from "@/components/editor/Editor.vue";
console.log(Editor);
import './detail.scss'
export default {
    template: element,
    components:{'editor':Editor},
    data() {
      return {
        day:'',
        time:'',
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
    computed:{
      date:{
        get:function(){
          return this.day+""+this.time;
        },
        set:function(newValue){
          var date = newValue.split(' ');
          console.log(date);
          this.day = date[0];
          this.time = date[1];
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
        http.post('api/infomation/saveInfoMation',this.infomation).then(function(data){
          console.log(data);
        });
      }
    },
    created:function(){
        http.get('api/infomation/detail/'+this.$route.params.id).then((res) => {
      this.infomation = res.data;
      this.date = res.data.created;
		})
    }
  }