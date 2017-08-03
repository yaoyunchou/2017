import http from 'http';
import {
	httpConfig
} from '../globals';

class Http {
	static httpModth(options) {
		const req = http.request(options, (res) => {
			console.log(`STATUS: ${res.statusCode}`);
			console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
			res.setEncoding('utf8');
			res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
			});
			res.on('end', () => {
				console.log('No more data in response.');
			});
		});

		req.on('error', (e) => {
			console.error(`problem with request: ${e.message}`);
		});

		// write data to request body
		req.write(postData);
		req.end();
	}
	static get(option) {
		option = _.extend(httpConfig, option)
		return this.httpModth(opeion)

	}
}
var http = new Http();
export default http;
