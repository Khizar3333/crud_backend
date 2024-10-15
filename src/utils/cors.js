
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCORSHeaders = void 0;
var setCORSHeaders = function (res) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust in production
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
};
exports.setCORSHeaders = setCORSHeaders;
