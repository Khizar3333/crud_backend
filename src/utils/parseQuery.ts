// utils/parseQuery.ts
import { IncomingMessage } from 'http';
import { URL } from 'url';

export const parseQuery = (req: IncomingMessage) => {
  const url = new URL(req.url || '', `http://${req.headers.host}`);
  return Object.fromEntries(url.searchParams.entries());
};
