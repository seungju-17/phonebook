'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function CategoryFilter({
  categories,
  selectedId
}: {
  categories: { id: string, name: string, color?: string | null }[]
  selectedId?: string | null
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleSelect = (id: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (id) {
      params.set('category', id)
      params.set('page', '1')
    } else {
      params.delete('category')
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide py-2 -mx-1 px-1">
      <button
        onClick={() => handleSelect(null)}
        className={`px-6 py-2 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
          !selectedId
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
            : 'bg-white/50 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800'
        }`}
      >
        전체
      </button>
      
      {categories.map((c) => {
        const isSelected = selectedId === c.id
        return (
          <button
            key={c.id}
            onClick={() => handleSelect(c.id)}
            className={`px-6 py-2 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-300 inline-flex items-center gap-2 ${
              isSelected
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                : 'bg-white/50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800'
            }`}
          >
            {c.color && (
              <span 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: c.color }}
              />
            )}
            {c.name}
          </button>
        )
      })}
    </div>
  )
}
