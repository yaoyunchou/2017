import {
	routePrefix,
	route
} from '../router';
import ImageService from '../services/image.service';
import Service from '../common/service.decorator';



@routePrefix('image')
export default class ImageController{
	@route('imageUpload','post') // http://localhost:3000/user
	imageUpload() {
		//let infomation = this.service.create();
		//fixhtml(infomation);
		return {name:'test',title:'image'};
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
