import './globals.css'
import Threads from '@/app/Threads'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { PostThread } from './PostThread'
import { clsx } from 'clsx'
import { Loader2 } from 'lucide-react'
import { Inter } from 'next/font/google'
import { ReactNode, Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'なんE',
  description: 'なんでも実況Eのwebクライアントです',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className={clsx(inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <h1 className="text-4xl font-bold px-4 pt-4 sm:px-12 sm:pt-12">
            なんでも実況E
          </h1>
          <main className="sm:flex">
            <div
              className={
                'sm:pl-12 sm:pt-6 pl-4 pt-4 sm:pb-12 min-w-200 top-0 sm:sticky h-full'
              }
            >
              <Suspense
                fallback={
                  <div className={'grid place-content-center'}>
                    <Loader2 className={'animate-spin'} />
                  </div>
                }
              >
                <Threads />
              </Suspense>
              {/*<PostThread />*/}
            </div>
            <div className={'basis-[fit-content]'}>{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
