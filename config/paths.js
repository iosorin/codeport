const path = require('path');

module.exports = {
    dist: path.resolve(__dirname, '../build'),
    public: path.resolve(__dirname, '../public'),
    src: path.resolve(__dirname, '../source/client'),
    media: path.resolve(__dirname, '../source/client/media'),
    styles: path.resolve(__dirname, '../source/client/styles'),
};
