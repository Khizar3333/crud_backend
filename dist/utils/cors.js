"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCORSHeaders = void 0;
const setCORSHeaders = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST,PUT,DELETE,GET OPTIONS');
};
exports.setCORSHeaders = setCORSHeaders;
