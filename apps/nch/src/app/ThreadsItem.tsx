'use client'

import { clsx } from 'clsx'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

export const runtime = 'edge'

export default function ThreadsItem ({threads}: {threads: string[][]}) {
  const params = useParams()
  return threads?.map((thread) => (
    <Link className={clsx(params.dat === thread[0] && 'bg-gray-200')} href={`/threads/${thread[0]}`} key={thread[0]}>
      <div key={thread[0]} className={clsx(params.dat === thread[0] && 'underline', 'text-sm p-1 hover:underline rounded')}>
        {thread[1]}
      </div>
    </Link>
  ))
}
