// handlers/handleDeleteUser.ts
import { IncomingMessage, ServerResponse } from 'http';
import { supabase } from '../utils/supabaseClient.js';
import { parseQuery } from '../utils/parseQuery.js';

export const handleDeleteUser = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'DELETE' && req.url?.startsWith('/api/delusers')) {
    const query = parseQuery(req);
    const userId = query.id;

    if (!userId) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'User ID is required for deletion' }));
    }

    try {
      const { data, error } = await supabase.from('users').delete().eq('id', userId).single();

      if (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: error.message }));
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User deleted successfully', data }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
  }
};
