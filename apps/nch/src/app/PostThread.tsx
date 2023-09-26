'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import fetch from 'node-fetch'
import { useState } from 'react'

export const runtime = 'edge'

export const PostThread = () => {
  const router = useRouter()
  const [subject, setSubject] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [open, setOpen] = useState(false)

  const onPost = async () => {
    const localCookie = localStorage.getItem('Cookie')
    const data = {
      bbs: 'edge',
      time: Math.floor(new Date().getTime() / 1000),
      submit: '書き込む',
      subject,
      FROM: name,
      mail: '',
      MESSAGE: message, // txtから取得したメッセージを使用
      Cookie: localCookie,
    }

    const response = await fetch(`/api/thread/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).catch((e) => {
      console.log(e)
    })

    const text = await response?.text()
    console.log(text)

    // // 書き込み確認画面に遷移したら
    // if (text && (text.includes('書き込み確認') || text.includes('2ch_X:cookie'))) {
    //   setResponse(text)
    //   setOpen(true)
    //   // cookieを取得
    //   const cookie = response?.headers?.get('Cookie')
    //   if (cookie) {
    //     localStorage.setItem('Cookie', cookie)
    //   }
    // } else {
    //   setMessage('')
    //   router.refresh()
    // }
  }

  const handleOk = () => {
    setOpen(false)
    onPost()
  }

  return (
    <>
      <div className={'mb-4 flex gap-2 mt-4 px-1 py-0.5'}>
        <textarea
          className={'rounded block w-full bg-transparent border'}
          name="subject"
          id="subject"
          placeholder={'スレタイ'}
          rows={1}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        {/*<input*/}
        {/*  className={'rounded block bg-transparent border mb-1 px-1'}*/}
        {/*  value={name}*/}
        {/*  placeholder={'名前'}*/}
        {/*  onChange={(e) => setName(e.target.value)}*/}
        {/*  type="text"*/}
        {/*/>*/}
        {/*<textarea*/}
        {/*  className={'rounded block w-full bg-transparent border p-2 mb-2'}*/}
        {/*  name="txt"*/}
        {/*  id="txt"*/}
        {/*  value={message}*/}
        {/*  onChange={(e) => setMessage(e.target.value)}*/}
        {/*/>*/}
        <button className={'border rounded px-2'} onClick={onPost}>
          post
        </button>
      </div>
      <Dialog open={open} onOpenChange={(x) => setOpen(x)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>書き込み確認</DialogTitle>
            <DialogDescription
              dangerouslySetInnerHTML={{ __html: response }}
            ></DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleOk}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
