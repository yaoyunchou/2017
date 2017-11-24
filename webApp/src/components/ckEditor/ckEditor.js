

import element from './ckEditor.html';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';
export default{
    name:'ckEditor',
    template:element,
    props:{
        width:String,
        height:String,
        value:String
    },
    data(){
        return {
            ckId:'ck'+ parseInt(Math.random()*100000) 
        }
    },
    methods:{
        updateValue:function(value){
            this.$emit('input',value);
        }
    },
    mounted:function(){
        var self = this;
        console.log(self.$el.querySelectorAll('p'));
        InlineEditor
        .create(self.$refs.mybox)
        .then( editor => {
            console.log( editor );
            editor.setData('');
        } )
        .catch( error => {
            console.error( error );
        } );
        self.$el.querySelectorAll('p').forEach(function(element) {
            InlineEditor
            .create(element)
            .then( editor => {
                console.log( editor );
                editor.setData('');
            } )
        }, this);
       
    }

}