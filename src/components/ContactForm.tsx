'use client'

import { useTransition } from 'react'

export function ContactForm({
  action,
  initialData,
  categories,
  onCancel
}: {
  action: (formData: FormData) => Promise<void>
  initialData?: { id?: string, name: string, phone: string, categoryId?: string, memo?: string } | null
  categories: { id: string, name: string }[]
  onCancel?: () => void
}) {
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      await action(formData)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}
      
      <div className="flex flex-col gap-3">
        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">이름</label>
        <input 
          name="name"
          defaultValue={initialData?.name || ''}
          placeholder="홍길동"
          required
          className="h-14 px-6 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/5 dark:border-white/5 focus:bg-white dark:focus:bg-zinc-800 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 outline-none transition-all duration-300 font-medium"
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">전화번호</label>
        <input 
          name="phone"
          defaultValue={initialData?.phone || ''}
          placeholder="010-0000-0000"
          pattern="^[0-9\-\s]+$"
          required
          className="h-14 px-6 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/5 dark:border-white/5 focus:bg-white dark:focus:bg-zinc-800 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 outline-none transition-all duration-300 font-mono font-medium"
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">그룹</label>
        <div className="relative">
          <select 
            name="categoryId"
            defaultValue={initialData?.categoryId || ''}
            className="w-full h-14 px-6 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/5 dark:border-white/5 focus:bg-white dark:focus:bg-zinc-800 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 outline-none transition-all duration-300 font-medium appearance-none cursor-pointer"
          >
            <option value="">그룹 선택 안 함</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">메모 (선택)</label>
        <textarea 
          name="memo"
          defaultValue={initialData?.memo || ''}
          placeholder="특이사항을 입력하세요..."
          rows={4}
          className="p-6 rounded-[2rem] bg-black/[0.03] dark:bg-white/[0.05] border border-black/5 dark:border-white/5 focus:bg-white dark:focus:bg-zinc-800 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 outline-none transition-all duration-300 font-medium resize-none leading-relaxed"
        />
      </div>

      <div className="flex justify-end gap-4 pt-6">
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel}
            className="h-14 px-8 rounded-2xl font-bold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
          >
            취소
          </button>
        )}
        <button 
          type="submit"
          disabled={isPending}
          className="h-14 px-10 rounded-2xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
        >
          {isPending ? '저장 중...' : (initialData?.id ? '수정 완료' : '추가하기')}
        </button>
      </div>
    </form>
  )
}
