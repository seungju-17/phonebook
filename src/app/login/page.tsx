import { login } from '@/app/actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>
}) {
  const params = await searchParams

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[85vh] px-4 animate-in fade-in duration-1000">
      <div className="w-full max-w-md">
        
        {/* Premium Header */}
        <div className="text-center mb-12">
          <div className="relative inline-flex mb-8">
            <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse" />
            <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-5xl shadow-2xl">
              📒
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight font-display text-zinc-900 dark:text-zinc-50 mb-3">Welcome Back</h1>
          <p className="text-base text-zinc-500 dark:text-zinc-400 font-medium tracking-tight">
            가장 진보된 암호화 시스템으로 보호되는 연락처.
          </p>
        </div>

        <div className="glass rounded-[3rem] p-10 sm:p-12 shadow-premium border-white/40 dark:border-white/10">
          <form
            className="flex flex-col gap-6"
            action={login}
          >
            {/* 이메일 */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1" htmlFor="email">
                이메일 주소
              </label>
              <input
                id="email"
                className="h-14 px-6 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/5 dark:border-white/5 focus:bg-white dark:focus:bg-zinc-800 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 outline-none transition-all duration-300 font-medium"
                name="email"
                type="email"
                placeholder="name@company.com"
                required
              />
            </div>

            {/* 비밀번호 */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1" htmlFor="password">
                보안 비밀번호
              </label>
              <input
                id="password"
                className="h-14 px-6 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/5 dark:border-white/5 focus:bg-white dark:focus:bg-zinc-800 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 outline-none transition-all duration-300 font-medium"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>

            {/* 로그인 버튼 */}
            <button className="mt-4 w-full h-14 rounded-2xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 active:scale-[0.97] transition-all shadow-xl shadow-blue-500/20">
              시스템 액세스
            </button>

            {/* 회원가입 링크 */}
            <p className="text-sm text-center text-zinc-500 dark:text-zinc-400 font-medium mt-4">
              처음 이용하시나요?{' '}
              <a
                href="/signup"
                className="text-blue-600 hover:text-blue-500 font-bold transition-colors"
              >
                새 계정 만들기
              </a>
            </p>

            {/* 에러 메시지 */}
            {params?.message && (
              <div className="mt-4 p-5 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-center text-sm font-bold rounded-2xl animate-shake">
                {params.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
