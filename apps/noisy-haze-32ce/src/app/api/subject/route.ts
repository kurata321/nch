
// Next.js Edge API Route Handlers: https://nextjs.org/docs/app/building-your-application/routing/router-handlers#edge-and-nodejs-runtimes

import type { NextRequest } from 'next/server'
import fetch from 'node-fetch'
import iconv from 'iconv-lite';

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const res = await fetch('https://d1ch.cc/edge/subject.txt')
  const buffer = await res.arrayBuffer();
  const text = iconv.decode(Buffer.from(buffer), 'shift_jis');
  return new Response(text);
}
