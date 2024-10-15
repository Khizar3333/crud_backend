import { IncomingMessage, ServerResponse } from 'http';
import { supabase } from '../utils/supabaseClient.js';
import { StringDecoder } from 'string_decoder';
import { parseQuery } from '../utils/parseQuery.js';


 export const handleUserCreation = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'POST' && req.url === '/api/users') {
    let body = '';
    const decoder = new StringDecoder('utf-8');

    req.on('data', chunk => {
      body += decoder.write(chunk);
    });

    req.on('end', async () => {
      body += decoder.end();
      try {
        const { name, email, image_url, video_url } = JSON.parse(body);
        const { data, error } = await supabase
          .from('users') // Replace 'users' with your table name
          .insert([{ name, email, image_url, video_url }]);

        if (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: error.message }));
        }

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User created successfully', data }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
};
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
