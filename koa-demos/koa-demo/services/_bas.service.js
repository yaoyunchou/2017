/**
 * 服务基类
 *
 */
const mongoose = require('mongoose');
module.exports = class basService {
    constructor(name, schema) {
        this.name = name;
        this.DbModal = mongoose.model(name, schema);
    }
    /**
     * 保存数据
     * @param {object} data 
     */
    save(data) {
        return new Promise((resolve, reject) => {
            new this.DbModal(data).save(function (err) {
                if (err) {
                    reject(err);
                    throw new Error(err);
                } else {
                    resolve();
                }
            });
        });

    }
    /**
     * 获取数据
     * TODO 这里先放着后面完善
     * @param {object} searchOptions 
     */
    getList(searchOptions) {
        // let defaultOptions = {
        return new Promise((resolve, reject) => {
            searchOptions = {
                query: {},
                pageSize: 10,
                pageNum: 1,
            }.extends(searchOptions);
            let query = this.DbModal.find(searchOptions.query);
            var count = query.count();
            query.skip((searchOptions.pageNum - 1) * searchOptions.pageSize).limit(searchOptions.pageSize).exec(function (err,listData) {
                let backData = {
                    list:listData,
                    count:count,
                    pageNum:searchOptions.pageNum
                };
                if(err){
                    reject(err);
                }else{
                    resolve(backData);
                }
            });

        });
    }
};