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
exports.handleUserCreation = void 0;
const supabaseClient_js_1 = require("../utils/supabaseClient.js");
const string_decoder_1 = require("string_decoder");
const handleUserCreation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method === 'POST' && req.url === '/api/users') {
        let body = '';
        const decoder = new string_decoder_1.StringDecoder('utf-8');
        req.on('data', chunk => {
            body += decoder.write(chunk);
        });
        req.on('end', () => __awaiter(void 0, void 0, void 0, function* () {
            body += decoder.end();
            try {
                const { name, email, image_url, video_url } = JSON.parse(body);
                const { data, error } = yield supabaseClient_js_1.supabase
                    .from('users') // Replace 'users' with your table name
                    .insert([{ name, email, image_url, video_url }]);
                if (error) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: error.message }));
                }
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User created successfully', data }));
            }
            catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        }));
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});
exports.handleUserCreation = handleUserCreation;
// export const handleGetUsers = async (req: IncomingMessage, res: ServerResponse) => {
//   if (req.method === 'GET' && req.url?.startsWith('/api/users')) {
//     const query = parseQuery(req);
//     const userId = query.id;
//     try {
//       let { data, error } = userId
//         ? await supabase.from('users').select('*').eq('id', userId).single()
//         : await supabase.from('users').select('*');
//       if (error) {
//         res.writeHead(400, { 'Content-Type': 'application/json' });
//         return res.end(JSON.stringify({ error: error.message }));
//       }
//       res.writeHead(200, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify({ data }));
//     } catch (error) {
//       res.writeHead(500, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify({ error: 'Internal Server Error' }));
//     }
//   }
// };
// This should log the function definition
