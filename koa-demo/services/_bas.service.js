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
            
            new this.DbModal(data).save(function (err,user) {
                if (err) {
                    reject(err);
                    //throw new Error(err);
                } else {
                    resolve(user);
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
                select: {},
                query: {},
                pageSize: 10,
                pageNum: 1,
            }.extends(searchOptions);
            let query = this.DbModal.find(searchOptions.query);
            var count = query.count();
            query.skip((searchOptions.pageNum - 1) * searchOptions.pageSize).limit(searchOptions.pageSize).select(searchOptions.select).exec(function (err, listData) {
                let backData = {
                    list: listData,
                    count: count,
                    pageNum: searchOptions.pageNum
                };
                if (err) {
                    reject(err);
                } else {
                    resolve(backData);
                }
            });

        });
    }
    /**
     * 通过id查询
     */
    async getItem(id,expect={}) {
        try {
            let query = await this.DbModal.findById(id,expect);
            return query;
        } catch (error) {
            throw error;
        

        }
    }
};