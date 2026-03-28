export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Project: {params.id}</h1>
      {/* Qoder fills this with a real kanban board */}
      <div className="grid grid-cols-3 gap-4">
        {['Todo', 'In Progress', 'Done'].map((col) => (
          <div key={col} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="text-sm font-semibold text-gray-500 mb-3">{col}</div>
            <div className="text-sm text-gray-400 italic">No tasks yet</div>
          </div>
        ))}
      </div>
    </div>
  );
}
