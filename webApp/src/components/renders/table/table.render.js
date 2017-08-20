import renderCell from '../cells'
import _ from 'lodash'

var tableConfig = {
	table: {
		name: 'el-table',
		data: 'tableData'
	},
	tableColumn: []
}

/**
 * @export
 * @param {Object} basConfig 
 * @param {Array} config 
 */
export function configExtend(config) {
	config = config || [];
	config.forEach((v, k) => {
		let cell = {
			name: 'el-table-column', //固定配置
			type: 'text',
			props: {
				label: '', //必需字段
				width: '200'
			}
		}
		cell.props.label = v.label;
		for (let key of Object.keys(cell.props)) {
			cell.props[key] = v[key];
		}
		for (let key of Object.keys(cell)) {
			if (v[key]) {
				cell[key] = v[key];
			}

		}
		if (v.prop) {
			cell.props.prop = v.prop;
		}
		if (v.type!=='text') {
			cell.children = v.children;
		}
		if (!_.find(tableConfig.tableColumn, cell)) {
			tableConfig.tableColumn.push(cell);
		}

	})
}

export function renderTable(h, context) {
	console.log(context);
	// return h(tableConfig.table.name, {
	// 		props: {
	// 			data: context[tableConfig.table.data]
	// 		}
	// 	},
	// 	tableConfig.tableColumn.map((data) =>
	// 		renderCell(h, context, data)
	// 	)
	// )
	configExtend(context.table);
	//this.data = context.data;
	return (<el-table  data={context.data} border style="width: 100%">
			{
				tableConfig.tableColumn.map((data) =>
					renderCell(h,context,data)
				)
				
			}	
			</el-table>)
}
