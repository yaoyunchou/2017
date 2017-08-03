

let options = {
	hostname: 'www.google.com',
	port: 80,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': Buffer.byteLength(postData)
	}
};

export function httpConfig(){
    return options;
}