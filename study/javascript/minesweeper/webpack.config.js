const ClearWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
module.exports = {
    entry:{
        index:'./src/js/index'
    },
    output:{
        filename:'[name].[chunkhash].js'
    },
    devtool:'source-map',
    resolve:{
        extensions:['.js']
    },
    module:{
        loaders:[
            {
                test:/\.js$/,
                loader:"babel-loader",
                exclude: /node_modules/,
                query:{
                    presets:['es2015']
                }
            }
        ]
    },
    plugins:[
        new ClearWebpackPlugin(
            ['static/js/index.*.js','static/js/index.*.js.map'],
            {
                root:__dirname,//根目录
                verbose:true,//开启再控制台输出信息
                dry:false//启用删除文件
            }
        )
    ]
}