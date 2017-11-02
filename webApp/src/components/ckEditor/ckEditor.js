

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
    mounted:()=>{
        var self = this;
        InlineEditor
        .create( document.querySelector( '#'+this.ckId ) )
        .then( editor => {
            console.log( editor );
            //editor.setData('<p>Some text.</p>');
        } )
        .catch( error => {
            console.error( error );
        } );
    }

}