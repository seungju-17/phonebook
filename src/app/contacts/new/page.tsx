import { getCategories } from '@/app/actions/categories'
import { createContact } from '@/app/actions/contacts'
import { ContactForm } from '@/components/ContactForm'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function NewContactPage() {
  const categories = await getCategories()

  const handleCreate = async (formData: FormData) => {
    'use server'
    await createContact(formData)
    redirect('/contacts')
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
          <h1 className="text-3xl font-extrabold tracking-tight font-display">새 연락처 추가</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">새로운 인연의 정보를 안전하게 저장하세요.</p>
        </div>
      </div>
      
      <div className="glass rounded-[3rem] p-8 sm:p-12 shadow-premium">
        <ContactForm 
          action={handleCreate} 
          categories={categories}
          onCancel={() => redirect('/contacts')}
        />
      </div>
    </div>
  )
}
