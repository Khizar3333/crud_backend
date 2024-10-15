// handlers/handleUpdateUser.ts
import { IncomingMessage, ServerResponse } from 'http';
import { supabase } from '../utils/supabaseClient.js';
import { StringDecoder } from 'string_decoder';
import { parseQuery } from '../utils/parseQuery.js';

export const handleUpdateUser = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'PUT' && req.url?.startsWith('/api/updateusers')) {
    const query = parseQuery(req);
    const userId = query.id;

    if (!userId) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'User ID is required for update' }));
    }

    let body = '';
    const decoder = new StringDecoder('utf-8');

    req.on('data', (chunk) => {
      body += decoder.write(chunk);
    });

    req.on('end', async () => {
      body += decoder.end();
      try {
        const { name, email, image_url, video_url } = JSON.parse(body);

        const updateData: any = {};
        if (name !== undefined) updateData.name = name;
        if (email !== undefined) updateData.email = email;
        if (image_url !== undefined) updateData.image_url = image_url;
        if (video_url !== undefined) updateData.video_url = video_url;

        const { data, error } = await supabase
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
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  }
};
