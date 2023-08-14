'use client'

import Link from 'next/link'
import fetch from 'node-fetch'
import React, { useEffect, useState } from 'react'

export const runtime = 'edge'
export default function Sreads () {
  const [sreads, setSreads] = useState<any[]>([])
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/subject')
      console.log(response)
      const data = await response.text()
      setSreads(data.split('\n').map((sread) => sread.split('<>')))
    }
    fetchUsers()
  }, [])
  console.log(sreads)
  return (
    <div>
      {sreads.map((sread) => (
        <Link href={`/sreads/${sread[0]}`} key={sread}>
          <div key={sread} className={'text-sm mb-2'}>{sread[1]}</div>
        </Link>
      ))}
    </div>
  )
}
