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
		let pageSize = body.query.pageSize||10;
		let pageNumber = body.query.pageNumber||0;
		let sortter = { "pubDate":-1};
		let list = await this.service.getList({},pageSize,pageNumber,sortter);
		let backData = {
			isSuccess:true,
			data:list
		};

		return backData;
	}
	@route('addRssByLink')
	async addRssByLink(params,body){
		fetchInfomation(body.query.link,2,this.service)
		//return backData;
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