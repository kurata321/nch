'use client'

import { ArrowDownToLine, ArrowUpToLine, RotateCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from '../components/ui/button'
import { ModeToggle } from './ModeToggle'

export const runtime = 'edge'

const ScrollToButton = () => {
  const [isAtBottom, setIsAtBottom] = useState(false)

  const handleScroll = () => {
    // 現在のスクロール位置を取得
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const windowHeight = window.innerHeight
    const fullHeight = document.documentElement.scrollHeight

    setIsAtBottom(scrollTop + windowHeight >= fullHeight)
  }

  useEffect(() => {
    // スクロールイベントを追加
    window.addEventListener('scroll', handleScroll)
    // コンポーネントのクリーンアップ
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScrollTo = () => {
    if (typeof window !== 'undefined') {
      const target = isAtBottom ? 0 : document.body.scrollHeight
      window.scrollTo({ top: target, behavior: 'smooth' })
    }
  }

  return (
    <Button
      className={''}
      variant={'outline'}
      size={'icon'}
      onClick={handleScrollTo}
    >
      {isAtBottom ? <ArrowUpToLine size={16} /> : <ArrowDownToLine size={16} />}
    </Button>
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

export const Functions = () => {
  return (
    <div className={'fixed right-4 bottom-4'}>
      <div className={'flex gap-2'}>
        <ModeToggle />
        <RefreshButton />
        <ScrollToButton />
      </div>
    </div>
  )
}
