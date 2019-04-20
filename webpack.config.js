const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require(`path`);
const fs = require(`fs`);

const srcPath = path.resolve(__dirname, `./src/js/`);
const distPath = path.resolve(__dirname, `./dist/js/`);

function getEntries(dir, results) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, function(err, list) {
            if (err) {
                reject(err);
            }
            var i = 0;
            (function next() {
                var file = list[i++];
                if (!file) {
                    return resolve(results
                        .filter(item => item.match && item.match(/.*\.js$/))
                        .map((item) => {
                            return {
                                name: item.substring(srcPath.length + 1, item.length - 3),
                                path: item
                            }
                        }).reduce((memo, item) => {
                            memo[item.name] = item.path
                            return memo;
                        }, {})

                    );
                }
                file = `${dir}/${file}`;
                fs.stat(file, function(err, stat) {
                    if (stat && stat.isDirectory()) {
                        getEntries(file, results).then(res => {
                            results = results.concat(res);
                            next();
                        });
                    } else {
                        results.push(file);
                        next();
                    }
                });
            })();
        });
    })
};

module.exports = async function(mode = `production`) {
    let jsFiles = await getEntries(srcPath, []);
    return {
        mode: mode,
        resolve: {
            extensions: ['*', '.js', '.jsx']
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.scss$/,
                    loaders : ExtractTextPlugin.extract({
                        fallback : 'style-loader',
                        use : ['css-loader', 'sass-loader?outputStyle=compressed']
                    }),
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('./../css/bundle.css')
        ],
        entry: jsFiles,
        output: {
            path: distPath,
            filename: `[name].js`
        }
    };
};
