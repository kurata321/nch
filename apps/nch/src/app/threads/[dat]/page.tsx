import { PostText } from '@/app/threads/[dat]/PostText'
import { Thread } from '@/app/threads/[dat]/Thread'
import React, { Suspense } from 'react'
import { Loader2 } from "lucide-react"

export const runtime = 'edge'

export default function Page (query: { params: { dat: string } }) {
  return <div className="min-h-screen px-4 sm:px-12 pt-6">
    <Suspense fallback={<Loader2 className={'w-full text-center animate-spin'}/>}>
      <Thread dat={query.params.dat} />
    </Suspense>
    <PostText />
  </div>
}
