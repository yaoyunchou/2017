/**
 * Created by yao on 2016/10/23.
 */
"use strict";

import {routePrefix, route, koaRouter} from './router'
import Koa from "koa";
import wechat from "./wechat/g";
import config from './config';
import weixin from './weixin';
import serve from 'koa-static';
const koa = new Koa();
import  './job';
import controllers from './controllers';
controllers.bindRouters();

import context from './common/context';
const log4js = require('koa-log4')
koa.use(log4js.koaLogger(log4js.getLogger("http"), { level: 'auto' }))

koa.use(serve(__dirname + '/view'));

koa.use(wechat(config.wechat,weixin.reply));
koa.use(koaRouter.routes());
koa.use(koaRouter.allowedMethods());
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// var content = 'mongodb://localhost/yao'
// var content = MONGODB_URI ||'mongodb://localhost/yao'
mongoose.connect('mongodb://root:VFcfObzKDr6bIrWCa3tOJUALeZ6TdL2BRZep45e2@ufaifeqagyya.mongodb.sae.sina.com.cn:10128/admin', {
  useMongoClient: true,
  /* other options */
});	

//import "./test"

//console.log(process.env);
koa.listen(process.env.PORT||8090);
console.log('Listening:'+(process.env.PORT ||8090));


