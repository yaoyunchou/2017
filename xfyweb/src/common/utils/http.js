import * as http from 'axiso'
import globals from '@/globals'

function httpCell (options){
    options.url = globals.basAppUrl + options.url;
     try {
        let reslut = http(options);
     } catch (error) {
         
     }
}

/**
 * 提供get方法
 * 
 * @export
 * @param {any} params 
 */
export function httpGet(url,params){
    let options = {
        url:url,
        method:'get',
        param:params
    }
    return httpCell(options);
}

export function httpDelete(url,params){
    let options = {
        method:'delete',
        url:url,
        data:params
    }
    return httpCell(options);
}

export function httpPost(url,params){
    let options = {
        url:url,
        method:'post',
        data:params
    }
    return httpCell(options);
}

export function httpPut(url,params){
    let options = {
        url:url,
        method:'put',
        data:params
    }
    return httpCell(options);
}