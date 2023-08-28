'use client'

import { ModeToggle } from '@/app/ModeToggle'
import { Button } from '@/components/ui/button'
import { clsx } from 'clsx'
import { decode } from 'html-entities'
import { RotateCw } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'

export const runtime = 'edge'

export default function ThreadsItem({ threads }: { threads: string[][] }) {
  const params = useParams()

  return (
    <>
      <div className={'sm:h-[calc(100svh_-_10rem)] overflow-auto'}>
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

const RefreshButton = () => {
  const [isRotating, setIsRotating] = useState(false) // 回転状態を保持
  const router = useRouter()

  const handleRefresh = () => {
    setIsRotating(true) // 回転開始
    router.refresh()
    setTimeout(() => setIsRotating(false), 1000)
  }
  return (
    <Button
      className={''}
      variant={'outline'}
      size={'icon'}
      onClick={handleRefresh}
    >
      <RotateCw size={16} className={isRotating ? 'animate-spin' : ''} />
    </Button>
  )
}

const Functions = () => {
  return (
    <div className={'fixed right-4 bottom-4'}>
      <div className={'flex gap-2'}>
        <ModeToggle />
        <RefreshButton />
      </div>
    </div>
  )
}
