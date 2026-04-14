import { getContacts } from '@/app/actions/contacts'
import { getCategories } from '@/app/actions/categories'
import { ContactCard } from '@/components/ContactCard'
import { SearchBar } from '@/components/SearchBar'
import { CategoryFilter } from '@/components/CategoryFilter'
import { Pagination } from '@/components/Pagination'
import { DeleteDialog } from '@/components/DeleteDialog'
import Link from 'next/link'
import { logout } from '@/app/actions'

export const dynamic = 'force-dynamic'

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>
}) {
  const params = await searchParams
  const query = params.q || ''
  const categoryId = params.category || null
  const page = Number(params.page) || 1
  const limit = 12

  // 데이터 동시 패치 (부분일치 검색 성능 고려)
  const [categories, { data: contacts, total }] = await Promise.all([
    getCategories(),
    getContacts({ categoryId, searchQuery: query, page, limit })
  ])

  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out">
      {/* Premium Header */}
      <header className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end py-8 border-b border-black/5 dark:border-white/5 bg-transparent">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-4xl">📒</span>
            <span className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full">Secure Database</span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 font-display">연락처</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-base font-medium">총 <span className="text-zinc-900 dark:text-zinc-50 font-bold">{total}명</span>의 연락처가 암호화되어 보호되고 있습니다.</p>
        </div>
        
        <form action={logout}>
          <button className="px-6 py-2.5 text-sm font-bold text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-2xl transition-all duration-300">
            시스템 로그아웃
          </button>
        </form>
      </header>

      {/* Filters & Actions Sticky Bar */}
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between sticky top-6 z-30 glass p-4 rounded-3xl shadow-premium border-white/40 dark:border-white/10">
        <div className="flex gap-4 items-center w-full lg:w-auto flex-1">
          <SearchBar initialQuery={query} />
        </div>
        
        <div className="flex gap-3 w-full lg:w-auto justify-end shrink-0">
          <Link 
            href="/categories"
            className="flex-shrink-0 px-6 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-sm font-bold rounded-2xl transition-all active:scale-95"
          >
            그룹 편집
          </Link>
          <Link 
            href="/contacts/new"
            className="flex-shrink-0 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-500/20 rounded-2xl transition-all active:scale-95 hover:-translate-y-0.5"
          >
            연락처 추가
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <CategoryFilter categories={categories} selectedId={categoryId} />

        {/* Contact Grid */}
        {contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 glass rounded-[3rem] text-center border-dashed border-zinc-200 dark:border-zinc-800">
            <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800/50 rounded-full flex items-center justify-center mb-6 text-4xl shadow-inner">
              🔍
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">연락처를 찾을 수 없습니다</h3>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm max-w-sm font-medium">
              {query || categoryId 
                ? '조건을 다르게 입력하거나 필터를 해제해 보세요.' 
                : '아직 등록된 연락처가 없습니다. 첫 연락처를 추가해 보세요!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-700 delay-150">
            {contacts.map((contact) => {
              const cat = categories.find(c => c.id === contact.categoryId)
              return (
                <ContactCard
                  key={contact.id}
                  name={contact.name}
                  phone={contact.phone}
                  memo={contact.memo}
                  categoryName={cat?.name}
                  categoryColor={cat?.color}
                  actions={
                    <div className="flex items-center gap-2">
                      <Link 
                        href={`/contacts/${contact.id}/edit`}
                        className="p-2.5 bg-white/80 dark:bg-zinc-800/80 hover:bg-blue-500 hover:text-white rounded-xl shadow-sm transition-all duration-300"
                        title="수정"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </Link>
                      <DeleteDialog contactId={contact.id} contactName={contact.name} />
                    </div>
                  }
                />
              )
            })}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center py-12">
          <Pagination total={total} limit={limit} />
        </div>
      </div>
    </div>
  )
}
