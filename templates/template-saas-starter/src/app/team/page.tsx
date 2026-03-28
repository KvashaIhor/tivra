export default function TeamPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Team</h1>
        <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold">
          Invite Member
        </button>
      </div>
      {/* Qoder fills with real team member list + invite form */}
      <div className="rounded-xl border border-gray-200 bg-white divide-y">
        <div className="p-4 text-gray-400 italic text-sm">No team members yet</div>
      </div>
    </div>
  );
}
