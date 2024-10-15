"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const supabaseClient_js_1 = require("../utils/supabaseClient.js");
const parseQuery_js_1 = require("../utils/parseQuery.js");
const handleGetUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (req.method === 'GET' && ((_a = req.url) === null || _a === void 0 ? void 0 : _a.startsWith('/api/getusers'))) {
        const query = (0, parseQuery_js_1.parseQuery)(req);
        const userId = query.id;
        try {
            let { data, error } = userId
                ? yield supabaseClient_js_1.supabase.from('users').select('*').eq('id', userId).single()
                : yield supabaseClient_js_1.supabase.from('users').select('*');
            if (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: error.message }));
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ data }));
        }
        catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    }
});
exports.default = handleGetUsers;
