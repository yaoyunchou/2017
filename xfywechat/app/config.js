'use strict';

/**
 * Created by yao on 2016/11/3.
 */
/*global __dirname,module*/
var path = require('path');
var wechat_file = path.join(__dirname, '../config/wechat.txt');

var util = require('./libs/util');
var config = {
	wechat: {
		appID: 'wxaa1d387056944865',
		appSecret: '5107ab8612431421a7fced36828c8c9f',
		//appSecret: 'c7882d2015f0a46b90f8104c7cc764a7',
		token: 'yaoyunchou',
		//EncodingAESKey:'GVZX1z1URnCfbKI09pbglIvzTaBZp0y9ymbDJhncrn9',
		getAccessToken: function getAccessToken() {
			return util.readFileAsync(wechat_file);
		},
		saveAccessToken: function saveAccessToken(data) {
			data = JSON.stringify(data);
			return util.writeFileAsync(wechat_file, data);
		}
	}
};

module.exports = config;
//# sourceMappingURL=config.js.map