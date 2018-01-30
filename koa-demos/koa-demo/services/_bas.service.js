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
    async save(data) {
        return new this.DbModal(data).save(function (err) {
            if(err){
                throw new Error(err);
            }
        });
    }
    /**
     * 获取数据
     * TODO 这里先放着后面完善
     * @param {object} searchOptions 
     */
    getList(searchOptions){
        // let defaultOptions = {

        // };
        //this.DbModal.find()
    }
};