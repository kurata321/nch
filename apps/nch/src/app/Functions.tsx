'use client'

import { RotateCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Button } from '../components/ui/button'
import { ModeToggle } from './ModeToggle'

export const runtime = 'edge'

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
      </div>
    </div>
  )
}
