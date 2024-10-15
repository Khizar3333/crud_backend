"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCORSHeaders = void 0;
var setCORSHeaders = function (res) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust in production
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};
exports.setCORSHeaders = setCORSHeaders;
