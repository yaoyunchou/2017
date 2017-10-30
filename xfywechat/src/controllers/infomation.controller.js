import {
	routePrefix,
	route
} from '../router';
import InfomationSvc from '../services/infomation.service'
import Service from '../common/service.decorator'
import {fetchInfomation} from '../libs/util'



@routePrefix('infomation')
@Service(InfomationSvc, 'infomations')
export default class InfomationController{
	@route('detail/:id') // http://localhost:3000/user
	async getInfomation({id}) {
		let infomation = await this.service.getItemById(id);
		fixhtml(infomation);
		return infomation;
	}
	@route('list')
	async getList(params,body) {
		let pageSize = parseInt(body.query.pageSize) ||10;
		let pageNumber = parseInt(body.query.pageNumber)||1;
		let sortter = { "pubDate":-1};
		let expect =  body.query.expect||{};
		let list = await this.service.getList({},pageSize,pageNumber,expect,sortter);
		let total = await this.service.count({});
		let backData = {
			isSuccess:true,
			total:total,
			data:list
		};

		return backData;
	}
	@route('addRssByLink')
	async addRssByLink(params,body){
		try {
			fetchInfomation(body.query.link,2,this.service)
			return {isSuccess:ture,data:'添加成功！'};
		} catch (error) {
			return {isSuccess:false,data:error};
		}
		
	}
	@route('saveInfoMation','post')
	async saveInfoMation(params,body){
		try {
			let infomation = await this.service.saveItem(body.request.body);
			return {isSuccess:true,data:'添加成功！'};
		} catch (error) {
			return {isSuccess:false,data:error};
		}
		
	}
}

//fetchInfomation('http://www.w3cplus.com/rss.xml', 1,new InfomationSvc());
var schedule = require("node-schedule");
var rule = new schedule.RecurrenceRule();

　　rule.dayOfWeek = [0, new schedule.Range(1, 6)];

　　rule.hour = 1;

　　rule.minute = 55;

　　var job = schedule.scheduleJob(rule, function(){
　　　fetchInfomation('http://www.w3cplus.com/rss.xml', 1,new InfomationSvc());
　　});

function fixhtml(data){
	data.description.replace(/pre/g,"<div>");
	console.log(data.description);
}