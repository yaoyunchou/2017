const  webpack = require('webpack');
module.exports = {
  entry: 
  {
   
    main:'./main.js',
    //chunk:['jquery'],
    main1:'./main1.js'
    //chunk: ["./chunk1", "./chunk2"]
  },
  output: {
    path:__dirname+'/dist',
    //filename: 'build.js'
    filename: '[name].[chunkhash].js'
    
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name:"chunk",
      // filename:"chunk.js"//忽略则以name为输出文件的名字，否则以此为输出文件名字
      minChunks:2
    })
  ]

};