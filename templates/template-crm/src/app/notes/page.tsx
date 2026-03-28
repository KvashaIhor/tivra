export default function NotesPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Notes</h1>
        <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold">
          Add Note
        </button>
      </div>
      {/* Qoder fills in real notes linked to contacts/deals */}
      <div className="grid gap-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 text-gray-400 italic text-sm">
          No notes yet
        </div>
      </div>
    </div>
  );
}
