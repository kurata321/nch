'use client'

import { cookies } from 'next/headers'
import { useParams } from 'next/navigation'
import fetch from 'node-fetch'
import { useEffect, useState } from 'react'


export const Thread = () => {
  const params = useParams()
  const [thread, setThread] = useState<any[]>([])
  useEffect(() => {
    const fetchThread = async () => {
      const response = await fetch(`/api/thread/${params.dat}`)
      console.log(response)
      const data = await response.text()
      setThread(data.split('\n').map((sread) => sread.split('<>')).filter(x => x.length !== 1))
    }
    fetchThread()
  }, [])

  return <>
      {thread?.map((x) => (
        <div key={x[2]} className={'mb-2'}>
          <div className={'text-sm dark:text-slate-300 light:text-slate-500'}><span className={'font-bold'}>{x[0]}</span> {x[2]}</div>
          <div className={'whitespace-pre-wrap'}>{x[3].replace(/<br>/g, '\n').replace(/&gt;/g, '>').replace(/&lt;/g, '<')}</div>
        </div>
      ))}
  </>
}
