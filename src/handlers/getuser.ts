// handlers/handleGetUsers.ts
import { IncomingMessage, ServerResponse } from 'http';
import { supabase } from '../utils/supabaseClient.js';
import { parseQuery } from '../utils/parseQuery.js';

 const handleGetUsers = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'GET' && req.url?.startsWith('/api/getusers')) {
    const query = parseQuery(req);
    const userId = query.id;

    try {
      let { data, error } = userId
        ? await supabase.from('users').select('*').eq('id', userId).single()
        : await supabase.from('users').select('*');

      if (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: error.message }));
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ data }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
  }
};
export default handleGetUsers;