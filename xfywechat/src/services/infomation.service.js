
import basService from "../common/bas.service";
import schema from "../models/infomation.schema";
const moment = require('moment');

/**
 * 
 * 
 * @export
 * @class Service
 * @extends {basService}
 */
export default class Service extends basService {
	constructor() {
		super('infomation', schema)
    }
    saveInfo(data){
        var self = this;
        data = data||[];
        data.forEach(function(element) {
			if (element.typeId ==1){
				element.description = element.description.replace(/src="/ig, 'src="http://www.w3cplus.com');
			  }
            self.saveItem(element);
        }, this);
    }
	create() {
		return {
			title: '',
			link: '',
			description: '',
			pubDate: '',
			source: '',
			author: '',
			typeId: ''

		}
	}
}
