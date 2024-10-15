
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const http_1 = __importDefault(require("http"));
const cors_1 = require("./utils/cors");
const user_1 = require("./handlers/user");
const getuser_1 = __importDefault(require("./handlers/getuser"));
const deluser_1 = require("./handlers/deluser");
const updateuser_1 = require("./handlers/updateuser");
// Create HTTP server
const server = http_1.default.createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // Handle CORS
    (0, cors_1.setCORSHeaders)(res);
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }
    if (req.method === 'POST' && req.url === '/api/users') {
        yield (0, user_1.handleUserCreation)(req, res);
    }
    // Handle getting a user by ID
    else if (req.method === 'GET' && ((_a = req.url) === null || _a === void 0 ? void 0 : _a.startsWith('/api/getusers'))) {
        yield (0, getuser_1.default)(req, res);
    }
    // Handle getting all users
    else if (req.method === 'GET' && req.url === '/api/getusers') {
        yield (0, getuser_1.default)(req, res);
    }
    else if (req.method === 'DELETE' && ((_b = req.url) === null || _b === void 0 ? void 0 : _b.startsWith('/api/delusers'))) {
        yield (0, deluser_1.handleDeleteUser)(req, res);
    }
    else if (req.method === 'PUT' && ((_c = req.url) === null || _c === void 0 ? void 0 : _c.startsWith('/api/updateusers'))) {
        yield (0, updateuser_1.handleUpdateUser)(req, res);
    }
    // Handle 404 for other routes
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
    // Handle user creation
    // handleUserCreation(req, res);
}));
// Start the server
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
// // server.js
// import http from 'http';
// import { createClient } from '@supabase/supabase-js';
// import { parse } from 'url';
// import { StringDecoder } from 'string_decoder';
// import { supabase } from './utils/supabaseClient';
// // Supabase configuration
// // Create HTTP server
// const server = http.createServer(async (req, res) => {
//   const url = req.url || '';
//   const parsedUrl = parse(url, true);
//   const method = req.method;
//   const pathname = parsedUrl.pathname;
//   // Handle CORS
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
//   if (method === 'OPTIONS') {
//     res.writeHead(204);
//     return res.end();
//   }
//   if (method === 'POST' && pathname === '/api/users') {
//     let body = '';
//     const decoder = new StringDecoder('utf-8');
//     req.on('data', chunk => {
//       body += decoder.write(chunk);
//     });
//     req.on('end', async () => {
//       body += decoder.end();
//       const { name, email, image_url, video_url } = JSON.parse(body);
//       try {
//         const { data, error } = await supabase
//           .from('users') // Replace 'users' with your table name
//           .insert([{ name, email, image_url, video_url }]);
//         if (error) {
//           res.writeHead(400, { 'Content-Type': 'application/json' });
//           return res.end(JSON.stringify({ error: error.message }));
//         }
//         res.writeHead(201, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ message: 'User created successfully', data }));
//       } catch (error) {
//         res.writeHead(500, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ error: 'Internal Server Error' }));
//       }
//     });
//   } else {
//     res.writeHead(404, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({ error: 'Not Found' }));
//   }
// });
// // Start the server
// const PORT = 5000;
// server.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
console.log(user_1.handleUserCreation); // This should log the function definition
