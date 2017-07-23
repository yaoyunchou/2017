import {
	routePrefix,
	route
} from '../router';
import UserService from '../services/user.service'
import Service from '../common/service.decorator'



@routePrefix('user')
@Service(UserService, 'user')
export default class UserController{
    info(){
        console.log(this);
    }
	@route('detail/:id') // http://localhost:3000/user
	async getUser({
		id
	}) {
		let user = await timeout({
			id: "01",
			name: 'bowen',
			xxx: id
		});
		return user;
	}
	@route('create', 'get', false) // http://localhost:3000/api/user/create
	create() {
        console.log(this)
		return this.service.create();
    }
    @log
	@route('list')
	async getList() {
		let list = await timeout([{
			id: "01",
			name: 'bowen'
		}, {
			id: "01",
			name: 'bowen'
		}]);
		return list;
	}
}
function log(target, name, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = function() {
    console.log(`Calling "${name}" with`, arguments);
    return oldValue.apply(null, arguments);
  };

  return descriptor;
}
function timeout(testVal) {
	return new Promise((resolve) => {
		setTimeout(function() {
			resolve(testVal);
		}, 10);
	});
}
