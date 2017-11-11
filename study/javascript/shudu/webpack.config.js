module.exports = {
    entry:{
        index:'./src/js/index'
    },
    output:{
        filename:'[name][chunkhash].js'
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
    }
}