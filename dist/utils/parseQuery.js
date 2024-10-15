"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseQuery = void 0;
const url_1 = require("url");
const parseQuery = (req) => {
    const url = new url_1.URL(req.url || '', `http://${req.headers.host}`);
    return Object.fromEntries(url.searchParams.entries());
};
exports.parseQuery = parseQuery;
