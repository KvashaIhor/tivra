import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">CRM</h1>
      <nav className="mt-4 flex gap-4">
        <Link href="/contacts" className="text-indigo-600 hover:underline">Contacts</Link>
        <Link href="/deals" className="text-indigo-600 hover:underline">Deals</Link>
        <Link href="/notes" className="text-indigo-600 hover:underline">Notes</Link>
      </nav>
    </main>
  );
}
