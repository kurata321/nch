'use client'

import { clsx } from 'clsx'
import { useParams } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

type Props = {
  children: ReactNode
  id: number
}

export const ThreadTitle = ({ children, id }: Props) => {
  const [hash, setHash] = useState('')
  const params = useParams()

  useEffect(() => {
    setHash(window.location.hash)
  }, [params])
  return (
    <div className={clsx('text-sm dark:text-slate-300 light:text-slate-500', id.toString() === hash.substring(1) && 'font-bold underline')}>
      {children}
    </div>
  )
}
