"use strict";
var path = require('path');
var express = require('express');

module.exports = function (app) {

    var root = app.getValue('projectRoot');

    var npmPath = path.join(root, './node_modules');
    var bowerPath = path.join(root, './bower_components');
    var publicPath = path.join(root, './public');
    var browserPath = path.join(root, './browser');

    app.use(express.static(npmPath));
    app.use(express.static(bowerPath));
    app.use(express.static(publicPath));
    app.use(express.static(browserPath));

};
