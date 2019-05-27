const sourceOption = [ 
    {
        enter: './src/assets/page1', // 必须为字符串，且不为 ''。
        regexp: '.png',   // 要转换的png图片后缀。  默认png
        funTemp: null,    // 需要自定义打包格式可传入。 需求不大。暂未测试
        zipway: {
            padding: 4,  // 打包间隔。默认4。
            algorithm: 'binary-tree', // 图片排列方式。默认binary-tree  可选// top-down	left-right	diagonal	alt-diagonal	binary-tree
        },
        fileAndClassName: 'icon', // 生成的png css文件名 样式class名。默认icon.png icon.css
    },
    {
        enter: './src/assets/page2',
        regexp: '.png',
        funTemp: null,
        zipway: {
            padding: 40,
            algorithm: 'left-right',
        },
        fileAndClassName: 'icon',
    },
]

module.exports = sourceOption;
