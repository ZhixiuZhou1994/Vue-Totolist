const path=require('path')
const webpack=require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractPlugin=require('extract-text-webpack-plugin');

const isDev=process.env.NOD_ENV==='development'

const config={
  target:"web",
    entry:path.join(__dirname,'src/index.js'),
    output:{
        path:path.join(__dirname,'dist'),
        filename:'bundle.[hash:8].js',
    },
    module:{
        rules:[
            { 
                test: /\.vue$/,
                loader:'vue-loader'
            },
            {
              test:/\.styl/,
              use:['style-loader',
              'css-loader',
              {
                loader:'postcss-loader',
                options:{sourceMap:true,}
              },'stylus-loader']
        
            },
             {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
              test:/\.css$/,
              use:['style-loader','css-loader']
            },
            
            {
              test:/\.(png|jpg|jpeg|svg|gif)$/,
              use:[{
                loader:'url-loader',
                options:{
                  limit:1024,
                  name:'[name]-aaa.[ext]'
                }
              }]
            }
          
        ]
    },
    plugins:[
      new VueLoaderPlugin(),
      new webpack.DefinePlugin({
        'process.env':{NOD_ENV:isDev?'"development"':'"production"'}
      }),
      new HtmlWebpackPlugin({
        favicon:'sun.ico'
        
    })
  ]
}

if(isDev){
  config.module.rules.push(
    {
      test:/\.styl/,
      use:['style-loader',
      'css-loader',
      {
        loader:'postcss-loader',
        options:{sourceMap:true,}
      },'stylus-loader']

    }
  )
  config.devTool="#cheap-module-eval-source-map"//调试映射
  config.devSever={
    port:8080,
    host:'0.0.0.0',
    overlay:{
      errors:true
    },
    historyFallback:{

    },
    hot:true

  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}else{
   // 生成坏境的配置
  //  config.entry = {   // 将所用到的类库单独打包
  //   app: path.join(__dirname, 'src/index.js'),
  //   vendor: ['vue']};

  // config.output.filename = '[name].[chunkhash:8].js';
  // config.module.rules.push(
  //   {
  //     test:/\.styl/,
  //     use:ExtractPlugin.extract({
  //       fallback:'style-loader',
  //       use:[
  //         'css-loader',
  //     {
  //       loader:'postcss-loader',
  //       options:{sourceMap:true,}
  //     },'stylus-loader'
  //       ]
  //     })

  //   },
    
  // )
  // config.plugins.push(
  //   new ExtractPlugin('styles.[contnt.Hash:8].css'),
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name:'vendor'
  //   }),
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name:'runtime'
  //   })
  // )
}
module.exports=config