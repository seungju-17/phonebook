import { getCategories, createCategory, deleteCategory } from '@/app/actions/categories'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'

export default async function CategoriesPage() {
  const categories = await getCategories()

  const handleCreate = async (formData: FormData) => {
    'use server'
    await createCategory(formData)
    revalidatePath('/categories')
  }

  const handleDelete = async (formData: FormData) => {
    'use server'
    const id = formData.get('id') as string
    if (id) {
      await deleteCategory(id)
      revalidatePath('/categories')
    }
  }

  return (
    <div className="flex flex-col max-w-2xl mx-auto w-full pt-12 pb-24 animate-in slide-in-from-bottom-12 duration-1000">
      <div className="flex items-center gap-6 mb-12">
        <Link 
          href="/contacts"
          className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/80 dark:bg-zinc-900/80 shadow-premium hover:shadow-hover hover:-translate-x-1 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight font-display">그룹 관리</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">연락처를 성격에 맞게 분류해 보세요.</p>
        </div>
      </div>

      <div className="glass rounded-[3rem] p-8 sm:p-12 shadow-premium">
        
        {/* 새 분류 추가 폼 */}
        <section className="mb-12">
          <h3 className="text-lg font-bold tracking-tight mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-600 rounded-full" />
            새 그룹 추가
          </h3>
          <form action={handleCreate} className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex flex-col gap-2 flex-1 w-full">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">그룹 이름</label>
              <input 
                name="name"
                placeholder="예: 친구, 회사, 가족"
                required
                className="h-14 px-6 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/5 dark:border-white/5 focus:bg-white dark:focus:bg-zinc-800 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 outline-none transition-all duration-300 font-medium"
              />
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">색상</label>
              <input 
                name="color"
                type="color"
                defaultValue="#3b82f6"
                className="h-14 w-20 p-1.5 rounded-2xl cursor-pointer bg-black/[0.03] dark:bg-white/[0.05] border border-black/5 dark:border-white/5 hover:scale-105 transition-transform"
              />
            </div>
            <button 
              type="submit"
              className="h-14 px-8 rounded-2xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-95 transition-all w-full sm:w-auto mt-2 sm:mt-0"
            >
              추가하기
            </button>
          </form>
        </section>

        {/* 기존 분류 목록 */}
        <section>
          <h3 className="text-lg font-bold tracking-tight mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
            현재 그룹 목록
          </h3>
          {categories.length === 0 ? (
            <div className="py-12 text-center bg-black/5 dark:bg-white/5 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
              <p className="text-zinc-500 text-sm font-medium">등록된 그룹이 아직 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {categories.map(c => (
                <div key={c.id} className="group flex justify-between items-center p-5 rounded-2xl bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-sm transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-10 h-10 rounded-xl shadow-inner border border-black/10 flex items-center justify-center text-white" 
                      style={{ backgroundColor: c.color || '#ccc' }}
                    >
                      {c.name.charAt(0)}
                    </div>
                    <span className="font-bold text-zinc-800 dark:text-zinc-100">{c.name}</span>
                  </div>
                  <form action={handleDelete}>
                    <input type="hidden" name="id" value={c.id} />
                    <button 
                      type="submit"
                      className="opacity-0 group-hover:opacity-100 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all"
                    >
                      삭제
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  )
}
