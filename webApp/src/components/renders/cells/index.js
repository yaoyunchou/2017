import renderInput from './cell.input'
import renderImg from './cell.img'
import renderButton from './cell.button'

let nswCellRender = {
	renderInput,
	renderImg,
	renderButton
}


export default function renderCell(h, context, options) {
	if (options.type ==='button') {
		return h(options.name, {
			props: options.props,
		}, [
			self => {
				return (
                 <div >
                    {options.children.map((child,index)=>
                        renderButton(h, context,self,child) 
                    )}
                 </div>
				)
			}
		])
	} else if(options.type ==='selection'){
        return h(options.name, {
                    attrs:{
                        type:options.type
                    }
                })
    }else if(options.type ==='text') {
		return h(options.name, {
			props: options.props,
			attrs: options.attrs
		})
	}
}
