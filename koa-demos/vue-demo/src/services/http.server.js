const axios = require('axios');


function warpAxios (method){
    options.method = method;
    return axios(options);
}


export default {
    get(options) {
        return warpAxios('get',options);
    },
    post(options) {
        return warpAxios('post',options);
    },
    put(options) {
        return warpAxios('put',options);
    },
    delete(options) {
        return warpAxios('delete',options);
    }
}
