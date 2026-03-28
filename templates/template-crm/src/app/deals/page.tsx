const STAGES = ['Lead', 'Qualified', 'Proposal', 'Closed'];

export default function DealsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Deal Pipeline</h1>
      {/* Qoder fills in real deal pipeline grouped by stage */}
      <div className="grid grid-cols-4 gap-4">
        {STAGES.map((stage) => (
          <div key={stage} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="text-sm font-semibold text-gray-500 mb-3">{stage}</div>
            <div className="text-sm text-gray-400 italic">No deals</div>
          </div>
        ))}
      </div>
    </div>
  );
}
