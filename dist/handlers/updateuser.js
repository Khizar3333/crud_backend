
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
exports.handleUpdateUser = void 0;
const supabaseClient_js_1 = require("../utils/supabaseClient.js");
const string_decoder_1 = require("string_decoder");
const parseQuery_js_1 = require("../utils/parseQuery.js");
const handleUpdateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (req.method === 'PUT' && ((_a = req.url) === null || _a === void 0 ? void 0 : _a.startsWith('/api/updateusers'))) {
        const query = (0, parseQuery_js_1.parseQuery)(req);
        const userId = query.id;
        if (!userId) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'User ID is required for update' }));
        }
        let body = '';
        const decoder = new string_decoder_1.StringDecoder('utf-8');
        req.on('data', (chunk) => {
            body += decoder.write(chunk);
        });
        req.on('end', () => __awaiter(void 0, void 0, void 0, function* () {
            body += decoder.end();
            try {
                const { name, email, image_url, video_url } = JSON.parse(body);
                const updateData = {};
                if (name !== undefined)
                    updateData.name = name;
                if (email !== undefined)
                    updateData.email = email;
                if (image_url !== undefined)
                    updateData.image_url = image_url;
                if (video_url !== undefined)
                    updateData.video_url = video_url;
                const { data, error } = yield supabaseClient_js_1.supabase
                    .from('users')
                    .update(updateData)
                    .eq('id', userId)
                    .single();
                if (error) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: error.message }));
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User updated successfully', data }));
            }
            catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        }));
    }
});
exports.handleUpdateUser = handleUpdateUser;
