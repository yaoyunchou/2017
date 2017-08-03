import http from 'axios'

export default{
	 httpModth(options) {
		return http(options);
	},
	 get(url, data) {
		console.log(http.defaults.headers);
		let options = {
			method: 'get',
			data: data,
			url: url
		}
		return this.httpModth(options);
	},
	 put(url, data) {
		let options = {
			method: 'put',
			data: data,
			url: url
		}
		return this.httpModth(options);
	},
	 post(url, data) {
		let options = {
			method: 'post',
			data: data,
			url: url
		}
		return this.httpModth(options);
	},
	 delete(url, data) {
		let options = {
			method: 'delete',
			data: data,
			url: url
		}
		return this.httpModth(options);
	}

}
