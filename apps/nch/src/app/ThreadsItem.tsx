'use client'

import { clsx } from 'clsx'
import { decode } from 'html-entities'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'
import { Functions } from './Functions'

export const runtime = 'edge'

export default function ThreadsItem({ threads }: { threads: string[][] }) {
  const params = useParams()

  return (
    <>
      <div className={'sm:max-h-[calc(100svh_-_8rem)] max-w-[380px] overflow-auto'}>
        {threads?.map((thread) => (
          <Link
            className={clsx(params.dat === thread[0] && 'bg-gray-200')}
            href={`/threads/${thread[0]}`}
            key={thread[0]}
            prefetch={false}
          >
            <div
              key={thread[0]}
              className={clsx(
                params.dat === thread[0] && 'underline',
                'text-sm p-1 hover:underline rounded',
              )}
            >
              {decode(thread[1])}
            </div>
          </Link>
        ))}
      </div>
      <Functions />
    </>
  )
}

