import { headers } from 'next/headers'
import Link from 'next/link'
import fetch from 'node-fetch'
import React from 'react'

export const runtime = 'edge'

const fetchUsers = async () => {
  const headersList = headers()
  const host = headersList.get('host')
  const protocal = process?.env.NODE_ENV === 'development' ? 'http' : 'https'
  const response = await fetch(`${protocal}://${host}/api/subject`)
  const data = await response.text()
  return data.split('\n').map((sread) => sread.split('<>'))
}
export default async function Threads () {
  const threads = await fetchUsers()
  console.log(threads)
  return (
    <div>
      {threads?.map((thread) => (
        <Link href={`/threads/${thread[0]}`} key={thread[0]}>
          <div key={thread[0]} className={'text-sm mb-2'}>{thread[1]}</div>
        </Link>
      ))}
    </div>
  )
}
