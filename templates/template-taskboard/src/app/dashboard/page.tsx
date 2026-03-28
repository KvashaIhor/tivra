import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {/* Qoder will fill this in with real project/team data */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Projects" value="—" />
        <StatCard label="Tasks Open" value="—" />
        <StatCard label="Team Members" value="—" />
      </div>
      <nav className="mt-8 flex gap-4">
        <Link href="/projects" className="text-indigo-600 hover:underline">Projects →</Link>
        <Link href="/tasks" className="text-indigo-600 hover:underline">All Tasks →</Link>
      </nav>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-1 text-3xl font-bold text-gray-900">{value}</div>
    </div>
  );
}
