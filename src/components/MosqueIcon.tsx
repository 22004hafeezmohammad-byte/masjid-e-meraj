export function MosqueIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 6 v6" />
      <circle cx="32" cy="4" r="1.6" fill="currentColor" />
      <path d="M20 30 C20 22, 26 18, 32 18 C38 18, 44 22, 44 30" />
      <path d="M16 30 v22 h32 V30" />
      <path d="M10 36 v16 h6 V36 C16 33, 13 32, 13 32 S10 33, 10 36 Z" />
      <path d="M54 36 v16 h-6 V36 C48 33, 51 32, 51 32 S54 33, 54 36 Z" />
      <path d="M28 52 v-8 a4 4 0 0 1 8 0 v8" />
      <path d="M8 52 h48" />
    </svg>
  );
}
