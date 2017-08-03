import http from 'axios'

export default Http = {
	static httpModth(options) {
		return http(options);
	},
	static get(url,data){
		console.log(http.defaults.headers);
		let options = {
			method:'get',
			data:data,
			url:url
		}
		this.httpModth(options);
	},
	static put(url,data){
		let options = {
			method:'put',
			data:data,
			url:url
		}
		this.httpModth(options);
	},
	static post(url,data){
		let options = {
			method:'post',
			data:data,
			url:url
		}
		this.httpModth(options);
	},
	static delete(url,data){
		let options = {
			method:'delete',
			data:data,
			url:url
		}
		this.httpModth(options);
	}

}
