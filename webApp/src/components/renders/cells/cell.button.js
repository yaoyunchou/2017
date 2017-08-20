export default function renderButton(h, context,self,options){	
    if(options.handler){
        return (<el-button type="text" on-click={context[options.handler](self.row)}  size="small">{options.label}</el-button>);
    }else{
        return (<el-button type="text" on-click={options.ctrlFn(context,self.row)}  size="small">{options.label}</el-button>);
    }									
			
}