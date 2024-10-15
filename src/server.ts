// src/server.ts
import http from 'http';
import { setCORSHeaders } from './utils/cors';
import {handleUserCreation}  from './handlers/user';
import handleGetUsers from './handlers/getuser';
import { handleDeleteUser } from './handlers/deluser';
import { handleUpdateUser } from './handlers/updateuser';


// Create HTTP server
const server = http.createServer(async(req, res) => {
  // Handle CORS
  setCORSHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }
  if (req.method === 'POST' && req.url === '/api/users') {
    await handleUserCreation(req, res);
  } 
  // Handle getting a user by ID
  else if (req.method === 'GET' && req.url?.startsWith('/api/getusers')) {
    await handleGetUsers(req, res);
  } 
  // Handle getting all users
  else if (req.method === 'GET' && req.url === '/api/getusers') {
    await handleGetUsers(req, res);
  } 
  else if (req.method === 'DELETE' && req.url?.startsWith('/api/delusers')) {
    await handleDeleteUser(req, res);
  }
  else if (req.method === 'PUT' && req.url?.startsWith('/api/updateusers')) {
    await handleUpdateUser(req, res);
  }
  // Handle 404 for other routes
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
  // Handle user creation
  // handleUserCreation(req, res);
  
});

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







console.log(handleUserCreation); // This should log the function definition
