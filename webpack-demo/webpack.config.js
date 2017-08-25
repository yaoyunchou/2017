const  webpack = require('webpack');
module.exports = {
  entry: 
  {
    main:'./main.js',
  },
  output: {
    path:__dirname+'/dist',
    filename: 'build.js'
  },
  plugins: [
    //new webpack.optimize.CommonsChunkPlugin({})
  ]

};