/**
 * 服务基类
 *
 */
const mongoose = require('mongoose');
const log4js = require('log4js');
module.exports = class basService {
    constructor(name, schema) {
        this.name = name;
        this.DbModal = mongoose.model(name, schema);
        this.logger = log4js.getLogger(this.name);
    }
    /**
     * 保存数据
     * @param {object} data 
     */
    async save(data) {
        try {
            let entiry = new this.DbModal(data);
            let user = await entiry.save();
            return {
                isSuccess: true,
                data: user
            };
        } catch (error) {
            return this.thorwError(error);
        }
        // return new Promise((resolve, reject) => {

        //     new this.DbModal(data).save(function (err, user) {
        //         if (err) {
        //             reject(err);
        //             //throw new Error(err);
        //         } else {
        //             resolve(user);
        //         }
        //     });
        // });

    }
    /**
     * 获取数据
     * TODO 这里先放着后面完善
     * @param {object} searchOptions 
     */
    async getList(searchOptions) {
        // let defaultOptions = {
        try {
            searchOptions = Object.assign({
                select: {},
                query: {},
                pageSize: 10,
                pageNum: 1,
            }, searchOptions);
            let count = await this.DbModal.find(searchOptions.query).count();
            let listData = await this.DbModal.find(searchOptions.query).skip((searchOptions.pageNum - 1) * searchOptions.pageSize).limit(searchOptions.pageSize)
            return {
                isSuccess: true,
                data: {
                    'list': listData,
                    'count': count,
                    'pageNum': searchOptions.pageNum
                }
            };




        } catch (error) {
            return this.thorwError(error);
        }
    }
    /**
     * 通过id查询
     */
    async getItem(id, expect = {}) {
        try {
            let user = await this.DbModal.findById(id, expect);
            return {
                isSuccess: true,
                data: user
            };
        } catch (error) {
            return this.thorwError(error);

        }
    }
    async updateItem(id) {

    }
    async deleteItem(id) {

    }
    thorwError(err) {
        this.logger.error(err);
        return {
            isSuccess: false,
            err: err
        };
    }
};