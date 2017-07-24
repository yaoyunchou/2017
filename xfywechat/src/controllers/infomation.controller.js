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
		return infomation;
	}
	@route('list')
	async getList() {
		let list = await this.service.getList();
		let backData = {
			isSuccess:true,
			data:list
		};

		return backData;
	}
}

//fetchInfomation('http://www.w3cplus.com/rss.xml', 1,new InfomationSvc());
var schedule = require("node-schedule");
var rule = new schedule.RecurrenceRule();

　　rule.dayOfWeek = [0, new schedule.Range(1, 6)];

　　rule.hour = 0;

　　rule.minute = 0;

　　var job = schedule.scheduleJob(rule, function(){
　　　fetchInfomation('http://www.w3cplus.com/rss.xml', 1,new InfomationSvc());
　　});