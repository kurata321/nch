'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useParams, useRouter } from 'next/navigation'
import fetch from 'node-fetch'
import { useState } from 'react'

export const runtime = 'edge'

export const PostText = () => {
  const router = useRouter()
  const params = useParams()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [open, setOpen] = useState(false)

  const onPost = async () => {
    const localCookie = localStorage.getItem('Cookie')
    const data = {
      bbs: 'edge',
      key: (params.dat as string).replace(/\.dat$/, ''),
      time: '1690478222',
      submit: '書き込む',
      FROM: name,
      mail: '',
      MESSAGE: message, // txtから取得したメッセージを使用
      Cookie: localCookie
    }

    const response = await fetch(`/api/thread/${params.dat}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).catch((e) => {
      console.log(e)
    })

    const text = await response?.text()
    console.log(text)

    // 書き込み確認画面に遷移したら
    if (text && (text.includes('書き込み確認') || text.includes('2ch_X:cookie'))) {
      setResponse(text)
      setOpen(true)
      // cookieを取得
      const cookie = response?.headers?.get('Cookie')
      if (cookie) {
        localStorage.setItem('Cookie', cookie)
      }
    } else {
      setMessage('')
      router.refresh()
    }
  }

  const handleOk = () => {
    setOpen(false)
    onPost()
  }

  return <>
    <div className={'mb-4'}>
      <input
        className={'rounded bg-transparent border mb-1'}
        value={name}
        onChange={e => setName(e.target.value)}
        type="text"
      />
      <textarea
        className={'rounded w-full bg-transparent border p-2'}
        name="txt"
        id="txt"
        cols={30}
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button className={'border rounded px-2'} onClick={onPost}>post</button>
    </div>
    <Dialog open={open} onOpenChange={x => setOpen(x)}>
      <DialogContent className={'overflow-auto max-h-[80vh]'}>
        <DialogHeader>
          <DialogTitle>書き込み確認</DialogTitle>
        </DialogHeader>
        <DialogDescription dangerouslySetInnerHTML={{ __html: response }}></DialogDescription>
        <DialogFooter>
          <Button onClick={handleOk}>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}
