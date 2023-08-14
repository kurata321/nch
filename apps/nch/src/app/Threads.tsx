'use client'

import Link from 'next/link'
import fetch from 'node-fetch'
import React, { useEffect, useState } from 'react'

export const runtime = 'edge'
export default function Threads () {
  const [threads, setThreads] = useState<any[]>([])
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/subject')
      const data = await response.text()
      setThreads(data.split('\n').map((sread) => sread.split('<>')))
    }
    fetchUsers()
  }, [])
  console.log(threads)
  return (
    <div>
      {threads?.map((thread) => (
        <Link href={`/threads/${thread[0]}`} key={thread}>
          <div key={thread} className={'text-sm mb-2'}>{thread[1]}</div>
        </Link>
      ))}
    </div>
  )
}
