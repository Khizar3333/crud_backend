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
exports.handleDeleteUser = void 0;
const supabaseClient_js_1 = require("../utils/supabaseClient.js");
const parseQuery_js_1 = require("../utils/parseQuery.js");
const handleDeleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (req.method === 'DELETE' && ((_a = req.url) === null || _a === void 0 ? void 0 : _a.startsWith('/api/delusers'))) {
        const query = (0, parseQuery_js_1.parseQuery)(req);
        const userId = query.id;
        if (!userId) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'User ID is required for deletion' }));
        }
        try {
            const { data, error } = yield supabaseClient_js_1.supabase.from('users').delete().eq('id', userId).single();
            if (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: error.message }));
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User deleted successfully', data }));
        }
        catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    }
});
exports.handleDeleteUser = handleDeleteUser;
