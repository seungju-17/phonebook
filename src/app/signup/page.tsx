import { signup } from '@/app/actions'

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>
}) {
  const params = await searchParams

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-sm">
        {/* 아이콘 + 헤더 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-3xl mb-4 shadow-lg">
            📒
          </div>
          <h1 className="text-2xl font-bold tracking-tight">회원가입</h1>
          <p className="text-sm text-gray-500 mt-2">
            간편하게 가입하고 연락처를 안전하게 관리하세요
          </p>
        </div>

        <form
          className="flex flex-col gap-4"
          action={signup}
        >
          {/* 이메일 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700" htmlFor="email">
              이메일
            </label>
            <input
              id="email"
              className="rounded-xl px-4 py-3 bg-white border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              name="email"
              type="email"
              placeholder="example@email.com"
              required
            />
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700" htmlFor="password">
              비밀번호
            </label>
            <input
              id="password"
              className="rounded-xl px-4 py-3 bg-white border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              type="password"
              name="password"
              placeholder="6자 이상 입력해 주세요"
              minLength={6}
              required
            />
            <p className="text-xs text-gray-400 mt-0.5">
              영문, 숫자를 포함하여 6자 이상 입력해 주세요
            </p>
          </div>

          {/* 가입 버튼 */}
          <button className="mt-2 w-full rounded-xl px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] transition-all shadow-md">
            가입하기
          </button>

          {/* 로그인 링크 */}
          <p className="text-sm text-center text-gray-500 mt-2">
            이미 계정이 있으신가요?{' '}
            <a
              href="/login"
              className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition"
            >
              로그인
            </a>
          </p>

          {/* 메시지 */}
          {params?.message && (
            <div className="mt-2 p-4 bg-blue-50 border border-blue-100 text-blue-700 text-center text-sm rounded-xl">
              {params.message}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
