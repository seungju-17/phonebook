import { signup } from '@/app/actions'

export default async function SignupPage({
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
            <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-zinc-900/10 dark:bg-white/10 text-zinc-900 dark:text-zinc-50 text-5xl shadow-xl border border-white/20">
              ✍️
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight font-display text-zinc-900 dark:text-zinc-50 mb-3">Join Secure</h1>
          <p className="text-base text-zinc-500 dark:text-zinc-400 font-medium tracking-tight">
            단 30초면 시작할 수 있는 안전한 연락처 관리 서비스.
          </p>
        </div>

        <div className="glass rounded-[3rem] p-10 sm:p-12 shadow-premium border-white/40 dark:border-white/10">
          <form
            className="flex flex-col gap-6"
            action={signup}
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
                placeholder="you@example.com"
                required
              />
            </div>

            {/* 비밀번호 */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1" htmlFor="password">
                강력한 비밀번호 설정
              </label>
              <input
                id="password"
                className="h-14 px-6 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/5 dark:border-white/5 focus:bg-white dark:focus:bg-zinc-800 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 outline-none transition-all duration-300 font-medium"
                type="password"
                name="password"
                placeholder="6자 이상 입력"
                minLength={6}
                required
              />
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter pl-1">
                대소문자, 숫자, 특수 기호 조합을 권장합니다.
              </p>
            </div>

            {/* 가입 버튼 */}
            <button className="mt-4 w-full h-14 rounded-2xl bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 font-bold text-lg hover:scale-[1.02] active:scale-[0.97] transition-all shadow-xl shadow-black/10 dark:shadow-white/5">
              계정 생성하기
            </button>

            {/* 로그인 링크 */}
            <p className="text-sm text-center text-zinc-500 dark:text-zinc-400 font-medium mt-4">
              이미 계정이 있으신가요?{' '}
              <a
                href="/login"
                className="text-blue-600 hover:text-blue-500 font-bold transition-colors"
              >
                기존 계정으로 로그인
              </a>
            </p>

            {/* 메시지 */}
            {params?.message && (
              <div className="mt-4 p-5 bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-center text-sm font-bold rounded-2xl animate-in zoom-in-95 duration-300">
                {params.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
