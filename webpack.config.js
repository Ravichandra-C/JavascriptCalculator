const path=require('path');
const HtmlWebpackPlugin= require("html-webpack-plugin");
module.exports={
    mode:"development",
    entry:"./src/index.js",
    output:{
        filename:"index.js",
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.scss$/i,
                use:['style-loader','css-loader','sass-loader']
            },
            {
                test:/\.(js|jsx)/i,
                exclude:/node_modules/,
                use:{
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env','@babel/preset-react']
                    }
                }               
            },
            {
                test:/\.woff(2)?$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:"Calculator",
            template:"src/index.html"
        })
    ],
    devServer:{
        open:true,
        hot:true
    }
}