import iconv from 'iconv-lite'
import { NextRequest, NextResponse } from 'next/server'
import fetch, { Response } from 'node-fetch'

export const runtime = 'edge'

export async function POST(request: NextRequest, query: NextResponse) {
  const { bbs, time, FROM, mail, MESSAGE, subject, Cookie } = await request.json()
  const formData = new URLSearchParams({
    bbs: bbs,
    subject: encodeURIComponent(subject),
    submit: encodeURIComponent('新規スレッド作成'),
    time,
    FROM: encodeURIComponent(FROM),
    mail,
    MESSAGE: encodeURIComponent(MESSAGE)
  })
  const clientIP = request.headers.get('cf-connecting-ip')
  const userAgent = request.headers.get('user-agent')
  console.log(request)
  console.log({ clientIP, userAgent, Cookie, ip: request.ip, xIP: request.headers.get('x-real-ip'), remoteIP: request.headers.get('x-forwarded-for') })
  // const res = await fetch('https://d1ch.cc/test/bbs.cgi', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     'User-Agent': 'Monazilla/1.00 (nch)',
  //     'Connection': 'close',
  //     'Credentials': 'include',
  //     'Content-length': formData.toString().length.toString()
  //   },
  //   body: formData.toString()
  // })
  //
  // const buffer = await res.arrayBuffer()
  // const text = iconv.decode(Buffer.from(buffer), 'shift_jis')
  // console.log(res, text)

  return new Response(request.ip)
}
