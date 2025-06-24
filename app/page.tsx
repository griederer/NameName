export default function Home() {
  // Test comment for pre-commit hook
  const message = 'AI-powered baby name selection coming soon...'

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Baby Name Advisor</h1>
      <p className="mt-4 text-xl">{message}</p>
    </main>
  )
}
