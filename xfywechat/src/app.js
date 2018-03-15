/**
 * Created by yao on 2016/10/23.
 */
"use strict";
import {routePrefix,route,koaRouter} from './router'
import Koa from "koa";
import wechat from "./wechat/g";
import config from './config';
import weixin from './weixin';
import serve from 'koa-static';
const koa = new Koa();
import './job';
import controllers from './controllers';
controllers.bindRouters();

import context from './common/context';
const log4js = require('koa-log4')
koa.use(log4js.koaLogger(log4js.getLogger("http"), {
	level: 'auto'
}))
const one = function*(next) {
	console.log('>> one');
	yield next;
}

koa.use(one);
koa.use(serve(__dirname + '/view'));

koa.use(wechat(config.wechat, weixin.reply));
koa.use(koaRouter.routes());
koa.use(koaRouter.allowedMethods());
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://yao:625514@xfysj.cn:27017/yao', {
	//mongoose.connect('mongodb://localhost/yao', {
	useMongoClient: true,
	/* other options */
	server: {
		auto_reconnect: true,
		poolSize: 10
	}
});

// mongoose.connect('mongodb://localhost/yao', {
//     useMongoClient: true,
// 	/* other options */
// 	server: {
// 				auto_reconnect: true,
// 				poolSize: 10
// 			}
// });	

//import "./test"
//console.log(process.env);
koa.listen(process.env.PORT || 8090);
console.log('Listening:' + (process.env.PORT || 8090));
