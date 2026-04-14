import { type ReactNode } from 'react'

export function ContactCard({
  name,
  phone,
  memo,
  categoryName,
  categoryColor,
  actions
}: {
  name: string
  phone: string
  memo?: string | null
  categoryName?: string
  categoryColor?: string | null
  actions?: ReactNode
}) {
  return (
    <div className="flex flex-col p-6 glass rounded-[2.5rem] shadow-premium hover:shadow-hover hover:-translate-y-1 transition-all duration-500 gap-4 group relative overflow-hidden">
      {/* Decorative accent */}
      <div 
        className="absolute top-0 left-0 w-1.5 h-full opacity-50" 
        style={{ backgroundColor: categoryColor || '#3b82f6' }}
      />
      
      {/* Header section with name and category */}
      <div className="flex items-start justify-between relative">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight font-display">
              {name}
            </h3>
            {categoryName && (
              <span 
                className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm"
                style={{ 
                  backgroundColor: categoryColor ? `${categoryColor}15` : '#f4f4f5',
                  color: categoryColor || '#71717a',
                  border: `1px solid ${categoryColor ? `${categoryColor}30` : '#e4e4e7'}`
                }}>
                {categoryName}
              </span>
            )}
          </div>
          <p className="text-blue-600 dark:text-blue-400 font-mono text-sm font-medium tracking-tight">
            {phone}
          </p>
        </div>
        
        {/* Actions (Floating on hover) */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          {actions}
        </div>
      </div>
      
      {/* Memo (if any) */}
      {memo && (
        <div className="text-sm text-zinc-600 dark:text-zinc-400 bg-black/5 dark:bg-white/5 p-4 rounded-3xl border border-black/5 dark:border-white/5 line-clamp-3 leading-relaxed">
          {memo}
        </div>
      )}
    </div>
  )
}
