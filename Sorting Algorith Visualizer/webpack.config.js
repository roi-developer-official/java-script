const path = require('path');

module.exports = {
    entry: './app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname,'sorting-visualizer-deploy')
    }
}