import {
	routePrefix,
	route
} from '../router';
import InfomationSvc from '../services/infomation.service'
import Service from '../common/service.decorator'
import {fetchInfomation} from '../libs/util'

const dateFormat = require('dateformat');

@routePrefix('infomation')
@Service(InfomationSvc, 'infomations')
export default class InfomationController{
	@route('detail/:id') // http://localhost:3000/user
	async getInfomation({id}) {
		let infomation = await this.service.getItemById(id);
		fixhtml(infomation);
		infomation.yao = 'yaoyunchou';
		
		return {
			title: infomation.title,
			link: infomation.link,
			description: infomation.description,
			pubDate: infomation.pubDate,
			created: dateFormat(infomation.created ,"yyyy-mm-dd HH:mm:ss"),
			source: infomation.source,
			author: infomation.author,
			typeId: infomation.typeId,
			_slef:infomation

		};
	}
	@route('list')
	async getList(params,body) {
		let pageSize = parseInt(body.query.pageSize) ||10;
		let pageNumber = parseInt(body.query.pageNumber)||1;
		let sortter = { "pubDate":-1};
		let expect =  body.query.expect||{};
		let list =  await this.service.getList({},pageSize,pageNumber,expect,sortter);
	
		
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