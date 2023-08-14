import { PostText } from '@/app/threads/[dat]/PostText'
import { Thread } from '@/app/threads/[dat]/Thread'
import { cookies } from 'next/headers'
import React from 'react'

export const runtime = 'edge'

const Cookies = () => {
  const cookieStore = cookies()
  return cookieStore.getAll().map((cookie) => (
    <div key={cookie.name}>
      <p>Name: {cookie.name}</p>
      <p>Value: {cookie.value}</p>
    </div>
  ))
}

export default function Page (query: { params: { dat: string } }) {
  return <div className="min-h-screen px-12 pt-6">
    <Cookies />
    <Thread />
    <PostText />
  </div>
}
