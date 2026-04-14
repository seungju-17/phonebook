import { login } from '@/app/actions'

export default async function LoginPage({
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
          <h1 className="text-2xl font-bold tracking-tight">로그인</h1>
          <p className="text-sm text-gray-500 mt-2">
            안전한 연락처 관리, 시큐어 폰북
          </p>
        </div>

        <form
          className="flex flex-col gap-4"
          action={login}
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
              placeholder="비밀번호를 입력해 주세요"
              required
            />
          </div>

          {/* 로그인 버튼 */}
          <button className="mt-2 w-full rounded-xl px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] transition-all shadow-md">
            로그인
          </button>

          {/* 회원가입 링크 */}
          <p className="text-sm text-center text-gray-500 mt-2">
            아직 계정이 없으신가요?{' '}
            <a
              href="/signup"
              className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition"
            >
              회원가입
            </a>
          </p>

          {/* 에러 메시지 */}
          {params?.message && (
            <div className="mt-2 p-4 bg-red-50 border border-red-100 text-red-600 text-center text-sm rounded-xl">
              {params.message}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
