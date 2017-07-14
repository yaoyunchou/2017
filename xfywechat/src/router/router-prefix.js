/**
 * Created by yao on 2017/6/12.
 */
var router =  require('koa-router');
import {koaRouter} from './koa-router'
export  function routePrefix(route){
   return function(target){
       if(typeof target === 'function'){
           target.prototype.router = {
               prefix:route
           };
       }
   }
}