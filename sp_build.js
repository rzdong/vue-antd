/**
 * 生成雪碧图。 基于 spritesmith。
 * 支持多文件同时打包
 * 
 * 配置文件同名字目录sprite.config.js
 * 
 * 目前支持以下参数自定义
 * 
 *   enter: './src/assets/page2', 入口文件相对目录
 *   regexp: '.png',    // 匹配文件后缀
 *   zipway: {
 *       padding: 40,   // 压缩间隔单位px
 *       algorithm: 'left-right',  // 图片排列方式
 *   },
 *   fileAndClassName: 'icon',   // 生成的png css 文件名，样式类名
 * 
 * 更多自定义选项根据需求再考虑增加
 * 
 * 参考地址： 
 *  - https: //github.com/twolfson/spritesmith
 *  - https://www.npmjs.com/package/spritesmith
 * 
 * 任振东 rzdong163@163.com
 */


var fs = require('fs');
// Load in dependencies
var Spritesmith = require('spritesmith');

var sourceArr = require('./sp.config.js');
// console.log(sourceArr);
// return;
var optionTemp = {
        enter: '', // 源文件夹路径
        regexp: '.png', // 打包文件后缀
        output: '',    // 输出文件路径 ./src/assets/_page1
        funTemp: null, //  输出文件模板函数
        zipway: { // 压缩参数
            padding: 4,
            algorithm: 'binary-tree',
            algorithmOpts: {}
        },
        fileAndClassName: 'icon', // 生成的类名和文件名
    }

/**
 * 检查路径是否存在 如果不存在则创建路径
 * @param {string} folderpath 文件路径
 * 
 */
var checkDirExist = function (folderpath) {
    if (!fs.existsSync(folderpath)) {
        fs.mkdirSync(folderpath);
    }
}


/**
 * 生成css样式模板。
 * @param {*} result
 *      properties  {w, h}
 *      coordinates  {
 *                          src: {x,y,w,h},
 *                          src: {x,y,w,h},
 *                   }
 */
var functionTemplate = function (options, result) {
    var shared = '.' + options.fileAndClassName + '{ display:inline-block; background-image: url(\'I\'); background-size:WSMpx HSMpx; }'
        .replace('I', './' + options.fileAndClassName + options.regexp) // 生成文件引用地址 默认css 与png同一目录
        .replace('WSM', result.properties.width) // 整张图宽
        .replace('HSM', result.properties.height); // 整张图高



    var perSprite = []
    for (let key in result.coordinates) {
        perSprite.push(
            '.' + options.fileAndClassName + '-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
            .replace('N', key.replace(options.enter, '').replace(options.regexp, ''))
            .replace('W', result.coordinates[key].width)
            .replace('H', result.coordinates[key].height)
            .replace('X', result.coordinates[key].x)
            .replace('Y', result.coordinates[key].y)
        )
    }
    return shared + '\n' + perSprite.join('\n');
}

/**
 * 
 * @param {参数检查 目前只有enter入口是必填字段} option 
 */
var paramsTest = (option) => {
    if (typeof (option.enter) !== 'string' && option.enter !== '') {
        throw 'enter字段错误，参照路径：\'./src/assets/page1\'';
    }
}


/**
 * 遍历构建雪碧图
 */
sourceArr.forEach((item, index, arr) => {
    /**
     * 初始化配置
     */
    let options = Object.assign({}, optionTemp, item)

    /**
     * 参数检查, 目前只有enter参数为必填
     */
    paramsTest(options);

    /**
     * 构造output目录
     */
    if (options.enter[options.enter.length - 1] !== '/') {
        options.enter += '/'
    }
    var enterarr = options.enter.split('/')
    enterarr[enterarr.length - 2] = '_' + enterarr[enterarr.length - 2]
    options.output = enterarr.join('/')

    /**
     * 目录检查, 输出的png与css需要检测当前目录存在与否，不存在则创建目录
     */
    checkDirExist(options.output);

    /**
     * 读取指定文件路径 下的文件
     */
    const items = fs.readdirSync(options.enter)

    /**
     * 对文件进行过滤 选择符合条件的图片格式
     */
    const filters = items.filter(item => {
        return item.toString().indexOf(options.regexp) > -1
    })

    /**
     * 文件路径拼接 Spritesmith src字段需要此方法
     * dirs 结果如下
     * [  './src/assetsdog_00000.png',
     *    './src/assetsdog_00001.png',
     *    './src/assetslogo.png'
     * ]
     */
    const dirs = filters.map(item => { // 文件路径转化为项目相对路径，便于sprites使用
        return options.enter + item;
    })



    /**
     * 打包图片
     */
    Spritesmith.run({
        src: dirs,
        padding: options.zipway.padding, 
        algorithm: options.zipway.algorithm,  
    }, function handleResult(err, result) {
        console.log(`第${index+1}个目录开始 ->`, options.enter, '\n')
        // console.log(options)
        // If there was an error, throw it
        if (err) {
            throw err;
        }

        result.image // image缓冲文件 buffer
        result.coordinates // Object mapping filename to {x, y, width, height} of image   每个图片的大小文件名，数组等数据
        result.properties // Object with metadata about spritesheet {width, height}


        // 同步输出图片与样式地址
        fs.writeFileSync(options.output + options.fileAndClassName + '.png', result.image);
        fs.writeFileSync(options.output + options.fileAndClassName + '.css', functionTemplate(options, result))
        if (index === sourceArr.length - 1) {
            console.log(`共${index+1}个目录遍历完成`)
        }
    });

})
















