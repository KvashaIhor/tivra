import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Welcome</h1>
      <div className="flex gap-4">
        <Link href="/dashboard" className="px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold">
          Dashboard
        </Link>
        <Link href="/login" className="px-5 py-2 rounded-lg border border-gray-300 text-sm font-semibold">
          Sign In
        </Link>
      </div>
    </main>
  );
}
