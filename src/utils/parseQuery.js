"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseQuery = void 0;
var url_1 = require("url");
var parseQuery = function (req) {
    var url = new url_1.URL(req.url || '', "http://".concat(req.headers.host));
    return Object.fromEntries(url.searchParams.entries());
};
exports.parseQuery = parseQuery;
