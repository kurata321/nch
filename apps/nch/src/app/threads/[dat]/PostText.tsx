'use client'

import { useParams } from 'next/navigation'
import fetch from 'node-fetch'
import { useState } from 'react'


export const runtime = 'edge'

export const PostText = () => {
  const params = useParams()
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')

  const onPost = async () => {
    const spid = localStorage.getItem('spid')
    // if (!spid) {
    //   const res = await fetch('/api/sread', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     }
    //   })
    //   const data = await res.json()
    //   console.log(data)
    // }
    // const res = await fetch('https://d1ch.cc/test/bbs.cgi', {
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'User-Agent': 'Monazilla/1.00 (Macintosh; I; PPC)',
    //     'Connection': 'close',
    //     'Content-Length': '0',
    //   },
    //   'Credentials': 'include',
    //   method: 'POST',
    // }).catch((e) => {
    //   console.log(e)
    // })
    // console.log(res)
    // console.log(await res.text())
    const data = {
      bbs: 'edge',
      key: (params.dat as string).replace(/\.dat$/, ''),
      time: '1',
      submit: '書き込む',
      // FROM: '名前',
      // mail: 'メール',
      MESSAGE: message // txtから取得したメッセージを使用
    }

    const response = await fetch(`/api/sread/${params.dat}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const text = await response.text()
    console.log(text)
    setResponse(text)
  }

  return <>
    {/*<dialog className={'p-0 absolute modal:bg-slate-300 backdrop:bg-slate-900/50 backdrop:bg-opacity-50'} open={true}>*/}
    {/*  <div>*/}
    {/*    <div dangerouslySetInnerHTML={{ __html: response }} />*/}
    {/*    <label htmlFor="name">name</label>*/}
    {/*    <input type="text" name="name" id="name" />*/}
    {/*  </div>*/}
    {/*</dialog>*/}
    {/*<Dialog>*/}
    {/*  <DialogTrigger>Open</DialogTrigger>*/}
    {/*  <DialogContent>*/}
    {/*    <DialogHeader>*/}
    {/*      <DialogTitle>Are you sure absolutely sure?</DialogTitle>*/}
    {/*      <DialogDescription>*/}
    {/*        This action cannot be undone. This will permanently delete your account*/}
    {/*        and remove your data from our servers.*/}
    {/*      </DialogDescription>*/}
    {/*    </DialogHeader>*/}
    {/*  </DialogContent>*/}
    {/*</Dialog>*/}
    <div>
      <textarea
        className={'rounded w-full bg-transparent border p-2'}
        name="txt"
        id="txt"
        cols={30}
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
    </div>
    <button className={'border rounded px-2'} onClick={onPost}>post</button>
  </>
}
