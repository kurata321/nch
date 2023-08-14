import { PostText } from '@/app/component/PostText'
import { Thread } from '@/app/component/Thread'
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
  return <div className="min-h-screen p-12">
    <Cookies />
    <Thread />
    <PostText />
  </div>
}
