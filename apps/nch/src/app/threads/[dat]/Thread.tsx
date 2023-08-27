import { headers } from 'next/headers'
import fetch from 'node-fetch'
import { decode } from 'html-entities'

export const runtime = 'edge'

export const fetchThread = async (dat: string) => {
  // @reference: https://github.com/vercel/next.js/issues/48344#issuecomment-1637007616
  const headersList = headers()
  const host = headersList.get('host')
  const protocal = process?.env.NODE_ENV === 'development' ? 'http' : 'https'
  const response = await fetch(`${protocal}://${host}/api/thread/${dat}`)
  const data = await response.text()
  return data.split('\n').map((sread) => sread.split('<>')).filter(x => x.length !== 1)
}

// リンクを置き換える関数
const replaceReferences = (text: string) => {
  const decodedText = decode(text)
    .replace(/<br>/g, '\n')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')

  // 正規表現でマッチング
  const parts = decodedText.split(/(>>\s?\d+)/g)

  return parts.map((part, index) => {
    const match = part.match(/>>\s?(\d+)/)
    if (match) {
      const id = match[1]
      return <a key={index} href={`#${id}`} className="text-blue-600 dark:text-blue-400">{part}</a>
    } else {
      return part
    }
  })
}

export const Thread = async ({ dat }: { dat: string }) => {
  const thread = await fetchThread(dat)

  return (
    <>
      {thread?.map((x, i) => (
        <div id={String(i + 1)} key={x[2]} className={'mb-2'}>
          <div className={'text-sm dark:text-slate-300 light:text-slate-500'}>
            {i + 1}. <span className={'font-bold'}>{decode(x[0])}</span> {x[2]}
          </div>
          <div className={'whitespace-pre-wrap break-words'}>
            {replaceReferences(x[3])}
          </div>
        </div>
      ))}
    </>
  )
}
