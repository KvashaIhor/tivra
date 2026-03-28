export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {/* Qoder fills with analytics charts and stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {['Active Users', 'MRR', 'Events'].map((label) => (
          <div key={label} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-sm text-gray-500">{label}</div>
            <div className="mt-1 text-3xl font-bold text-gray-900">—</div>
          </div>
        ))}
      </div>
      {/* Chart placeholder */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 h-48 flex items-center justify-center text-gray-400 text-sm italic">
        Analytics chart will appear here
      </div>
    </div>
  );
}
