'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function Pagination({ total, limit }: { total: number; limit: number }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentPage = Number(searchParams.get('page')) || 1
  const totalPages = Math.ceil(total / limit)

  if (totalPages <= 1) return null

  const handlePage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex justify-center items-center gap-4 mt-12 py-6">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePage(currentPage - 1)}
        className="h-12 px-6 rounded-2xl text-sm font-bold bg-white/80 dark:bg-zinc-900/80 border border-black/5 dark:border-white/10 shadow-premium hover:shadow-hover hover:-translate-y-0.5 disabled:opacity-30 disabled:hover:translate-y-0 disabled:shadow-premium disabled:cursor-not-allowed transition-all duration-300"
      >
        이전
      </button>
      
      <div className="flex items-center justify-center min-w-[100px] h-12 bg-black/[0.03] dark:bg-white/[0.05] rounded-2xl border border-black/5 dark:border-white/5 font-mono text-sm">
        <span className="font-bold text-blue-600 dark:text-blue-400">{currentPage}</span>
        <span className="mx-2 text-zinc-300 dark:text-zinc-700">/</span>
        <span className="text-zinc-500 dark:text-zinc-400 font-medium">{totalPages}</span>
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePage(currentPage + 1)}
        className="h-12 px-6 rounded-2xl text-sm font-bold bg-white/80 dark:bg-zinc-900/80 border border-black/5 dark:border-white/10 shadow-premium hover:shadow-hover hover:-translate-y-0.5 disabled:opacity-30 disabled:hover:translate-y-0 disabled:shadow-premium disabled:cursor-not-allowed transition-all duration-300"
      >
        다음
      </button>
    </div>
  )
}
