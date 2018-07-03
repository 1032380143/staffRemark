let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// mix.react('resources/assets/js/app.js', 'public/js')
//    .sass('resources/assets/sass/app.scss', 'public/css');

const svgSpriteDirs = [
    require.resolve('antd-mobile').replace(/warn\.js$/, ''), // antd-mobile 内置svg
    //path.resolve(__dirname, 'src/my-project-svg-foler'),  // 业务代码本地私有 svg 存放目录
];

mix.webpackConfig({
    // module:{
    //     loaders: [
    //         {
    //             test: /\.svg$/i,
    //             loader: 'svg-sprite',
    //             include: svgSpriteDirs,
    //         },
    //         {
    //             test: /\.js$/,
    //             loader: 'babel-loader',
    //             exclude: /node_modules/,
    //             query: {
    //                 plugins: [["import", {
    //                     libraryName: "antd-mobile",
    //                     style: true,
    //                 }]]
    //             },
    //         }
    //     ]
    // },

    module: {
        loaders: [
            {
                test: /\.svg$/i,
                loader: 'svg-sprite',
                include: svgSpriteDirs
            }
        ]
    },

    resolve: {
        mainFiles: ["index.web", "index"],// 这里哦
    },
});

mix.react('resources/assets/js/index.js', 'public/js/index.js')
    .less('resources/assets/sass/index.less', 'public/css/index.css');

