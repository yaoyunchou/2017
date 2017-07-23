import basService from "../common/bas.serice";
import schema from "../models/user.schame";

export default class Service extends basService {
	constructor() {
		super('user', schema)
	}
	create() {
		return {
			name: '',
			nikeName: '',
			desc: '',
			avatar: '',
			roles: []
		}
	}
}
