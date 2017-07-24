
import basService from "../common/bas.service";
import schema from "../models/infomation.schema";

export default class Service extends basService {
	constructor() {
		super('infomation', schema)
    }
    saveInfo(data){
        var self = this;
        data = data||[];
        data.forEach(function(element) {
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
