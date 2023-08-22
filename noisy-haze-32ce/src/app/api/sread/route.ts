import iconv from 'iconv-lite'
import { NextRequest, NextResponse } from 'next/server'
import fetch, { Response } from 'node-fetch'

export const runtime = 'edge'

export async function POST(request: NextRequest, query: NextResponse) {
  const formData = new URLSearchParams({
    bbs: 'edge',
  })
  const res = await fetch('https://d1ch.cc/test/bbs.cgi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Monazilla/1.00 (nch)',
      'Connection': 'close',
      'Credentials': 'include',
      'Content-Length': '0',
    },
    body: formData.toString()
  })

  const buffer = await res.arrayBuffer()
  const text = iconv.decode(Buffer.from(buffer), 'shift_jis')
  console.log(res, text)

  return new Response(text)
}
