var prefix = 'https://api.weixin.qq.com/cgi-bin/';
module.exports = {
    accessToken: prefix + 'token?grant_type=client_credential',
    material: {
        //媒体
        temporary: {
            upload: prefix + 'media/upload?',
        },
        //图文
        permanent: {
            uploadNews: prefix + 'material/add_news?',
            uploadImage: prefix + 'media/uploadimg?',
            upload: prefix + 'material/add_material?'
        },
        //列表
        list: prefix + 'material/batchget_material?',
        count: prefix + 'material/get_materialcount?'
        // count:prefix+'material/get_materialcount?'
    }

};
