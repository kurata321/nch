// Next.js Edge API Route Handlers:
// https://nextjs.org/docs/app/building-your-application/routing/router-handlers#edge-and-nodejs-runtimes

import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import fetch, { Response } from 'node-fetch'
import iconv from 'iconv-lite'

export const runtime = 'edge'

export async function GET (request: NextRequest, query: NextResponse) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('dat')
  const res = await fetch(`https://d1ch.cc/edge/dat/${id}.dat`)
  const buffer = await res.arrayBuffer()
  const text = iconv.decode(Buffer.from(buffer), 'shift_jis')
  return new Response(text)
}

// POST https://d1ch.cc/edge/bbs.cgi HTTP/1.0
// Host: d1ch.cc
// Content-length: ポストするデータのサイズ(バイト)
// Cookie: NAME=名前; MAIL=メール; SPID(PON)=値; expires=有効期限; path=/
// Connection: close
//
// bbs=edge&key=id&time=1&submit=書き込む&FROM=名前&mail=メール&MESSAGE=本文
export async function POST (request: NextRequest, query: NextResponse) {
  const { bbs, key, time, submit, FROM, mail, MESSAGE } = await request.json()

  const formData = new URLSearchParams({
    bbs,
    key,
    time,
    submit,
    FROM,
    mail,
    MESSAGE
  })

  const res = await fetch('https://d1ch.cc/test/bbs.cgi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Connection': 'close',
      'Credentials': 'include',
      // 'Cookie': 'NAME=名前; MAIL=メール; SPID(PON)=値; expires=有効期限; path=/', // 必要なクッキーを追加
      'Content-length': formData.toString().length.toString()
    },
    body: formData.toString()
  })
  console.log(res)
  const cookie = res.headers.get('set-cookie') ?? ''
  console.log('cookie', cookie)

  const buffer = await res.arrayBuffer()
  const text = iconv.decode(Buffer.from(buffer), 'Shift_JIS')
  // const text = Buffer.from(buffer)

  return new Response(
    text,
    { headers: { ...res.headers, 'Cookie': cookie } }
  )
}
