// src/utils/cors.ts
import { IncomingMessage, ServerResponse } from 'http';

export const setCORSHeaders = (res: ServerResponse) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST,PUT,DELETE,GET,OPTIONS');
};