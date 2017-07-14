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

import './demo/user.controller';

koa.use(serve(__dirname + '/view'));

koa.use(wechat(config.wechat,weixin.reply));
koa.use(koaRouter.routes());
koa.use(koaRouter.allowedMethods());


koa.listen(process.env.PORT||8090);
console.log('Listening:'+(process.env.PORT ||8090));