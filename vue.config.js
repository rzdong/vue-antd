

const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
    publicPath: '/',                          // 部署应用包时的基本 URL
    outputDir: 'dist',                        // 输出目录
    assetsDir: 'static',                    // img css js 资源名，相对于outputDir
    indexPath: 'index.html',                // 输出文件名，相对于outputDir
    filenameHashing: true,                    // 文件名hash
    productionSourceMap: true,                // 有map 代码加密，报错无法得知错误行数
    devServer: {
        port: 8080,                           // devServer 相关设置
        // proxy: 'http://localhost:4000'
    },
    chainWebpack: (config) => {
        // 修复HMR
        // config.resolve.symlinks(true);

        // 添加别名 
        // config.resolve.alias
        //     .set('@', resolve('src'))
        //     .set('assets', resolve('src/assets'))
        //     .set('components', resolve('src/components'))
        //     .set('@store', resolve('src/store'))


        if(process.env.NODE_ENV == 'pro') {

            // 代码丑化压缩
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: true,
                        drop_console: true,
                        drop_debugger: true,
                        pure_funcs: ['console.log'] //移除console
                    },
                    mangle: false,
                    output: {
                        beautify: true,//压缩注释
                    }
                },
                sourceMap: false,
                parallel: true,
            })
        }

        // 压缩图片 
        // config.module
        //     .rule("images")
        //     .use("image-webpack-loader")
        //     .loader("image-webpack-loader")
        //     .options({   // 该配置来自 https://www.npmjs.com/package/image-webpack-loader#libpng-issues
        //         mozjpeg: {   // png压缩
        //             progressive: true, 
        //             quality: 65    // 图片质量  0-100
        //         },
        //         optipng: {enabled: false},  // png压缩
        //         pngquant: {quality: "65-90", speed: 4},  // png压缩
        //         gifsicle: {interlaced: false},  // gif压缩
        //         webp: {quality: 75}   // 压缩JPG和PNG图像到WEBP
        //     });
    },
    configureWebpack: (config) => {
        if(process.env.NODE_ENV == 'pro') {
            // 打包分析
            config.plugin('webpack-report')
                .use(BundleAnalyzerPlugin, [{
                    analyzerMode: 'static',
                }]);
        }
        
    },
    css: {
        extract: true, // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
        sourceMap: false,  // 是否开启 CSS source map？
        loaderOptions: {
            css: {
                modules: true,
                extract: process.env.NODE_ENV == 'pro',
                sourceMap: false,
                loaderOptions: {
                  sass: {
                    // 向全局sass样式传入共享的全局变量
                    // data: `@import "~assets/scss/variables.scss";$src: "${process.env.VUE_APP_SRC}";`
                  }
                }
            },
            postcss: {
                plugins: [
                    require('postcss-px2rem')({ 
                        remUnit: 100 
                    }), // 换算的基数
                    require('autoprefixer')({ 
                        browsers: [   // 转换条件
                            'last 10 Chrome versions', 
                            'last 5 Firefox versions', 
                            'Safari >= 6', 
                            'ie > 8']
                    }),
                ]
            }
        }
    }
}