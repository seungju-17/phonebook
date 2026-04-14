/**
 * XSS 방어를 위해 문자열 내 모든 HTML 태그 삭제 (순수 텍스트화)
 * Vercel 서버리스 환경 최적화를 위해 무거운 jsdom/dompurify 대신 정규식 사용
 */
export function sanitizeHTML(dirty: string): string {
  if (!dirty) return ''
  
  // 1. 모든 HTML 태그 제거
  let clean = dirty.replace(/<[^>]*>?/gm, '')
  
  // 2. 기본적인 HTML 엔티티 디코딩 (선택적)
  clean = clean
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")

  return clean.trim()
}
