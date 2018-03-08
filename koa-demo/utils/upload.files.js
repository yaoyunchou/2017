const fs = require('fs');
const path = require('path');
const qiniu = require('qiniu');
const {
    accessKey,
    secretKey
} = require('../config/qiniu.config');
qiniu.conf.ACCESS_KEY = accessKey;
qiniu.conf.SECRET_KEY = secretKey;
module.exports = async function (ctx, next) {
    this.req = ctx.req, this.res = ctx.res;
    //构建上传策略函数
    function uptoken(bucket, key) {
        let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        var putPolicy = new qiniu.rs.PutPolicy({
            scope: bucket
        });
        var uploadToken = putPolicy.uploadToken(mac);
        return uploadToken;
    }
    //构造上传函数
    function uploadFile(uptoken, key, readableStream) {
        var config = new qiniu.conf.Config();
        // 空间对应的机房
        config.zone = qiniu.zone.Zone_z0;
        // 是否使用https域名
        //config.useHttpsDomain = true;
        // 上传是否使用cdn加速
        //config.useCdnDomain = true;
        var formUploader = new qiniu.form_up.FormUploader(config);
        var putExtra = new qiniu.form_up.PutExtra();
        // 文件上传
        // formUploader.putFile(uptoken, key, localFile, putExtra, function (respErr,
        //     respBody, respInfo) {
        //     if (respErr) {
        //         throw respErr;
        //     }
        //     if (respInfo.statusCode == 200) {
        //         console.log(respBody);
        //     } else {
        //         console.log(respInfo.statusCode);
        //         console.log(respBody);
        //     }
        // });
        formUploader.putStream(uptoken, key, readableStream, putExtra, function (respErr,
            respBody, respInfo) {
            if (respErr) {
                throw respErr;
            }
            if (respInfo.statusCode == 200) {
                console.log(respBody);
            } else {
                console.log(respInfo.statusCode);
                console.log(respBody);
            }
        });

    }
    if (ctx.request.path === '/upload/file') {

        //要上传的空间
        let bucket = 'xfysj';
        //上传到七牛后保存的文件名
        let name = 'test';
        //生成上传 Token
        let token = uptoken(bucket, name);
        //要上传文件的本地路径
        let filePath = './logo.png';
        //调用uploadFile上传


        const tmpdir = __dirname;
        const filePaths = [];
        const files = ctx.request.body.files || {};

        for (let key in files) {
            const file = files[key];
            const filePath = path.join(tmpdir, file.name);
            const reader = await fs.createReadStream(file.path);
            const writer = await fs.createWriteStream(filePath);
            await uploadFile(token, name+Date.now(), reader);
            reader.pipe(writer);
            filePaths.push(filePath);
        }
       
        ctx.response.body = 'hello world!';

    }
    await next();
};