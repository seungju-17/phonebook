'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTransition, useState, useEffect } from 'react'

export function SearchBar({ initialQuery }: { initialQuery?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [query, setQuery] = useState(initialQuery || '')

  useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams)
        if (query) {
          params.set('q', query)
          params.set('page', '1') // 검색어 변경 시 첫 페이지로
        } else {
          params.delete('q')
        }
        router.replace(`${pathname}?${params.toString()}`)
      })
    }, 300)

    return () => clearTimeout(timer)
  }, [query, pathname, router, searchParams])

  return (
    <div className="relative flex-1 max-w-md w-full group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <svg className="w-5 h-5 text-zinc-400 group-focus-within:text-blue-500 transition-colors" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
      </div>
      <input
        type="text"
        className="block w-full h-12 pl-12 pr-4 text-sm rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/5 dark:border-white/5 focus:bg-white dark:focus:bg-zinc-900 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 outline-none transition-all duration-300 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 font-medium"
        placeholder="이름 또는 전화번호로 검색..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isPending && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <div className="w-4 h-4 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
