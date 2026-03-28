export default function TasksPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">All Tasks</h1>
      {/* Qoder will render real task list here */}
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-left text-gray-500">
            <th className="pb-3 font-medium">Title</th>
            <th className="pb-3 font-medium">Project</th>
            <th className="pb-3 font-medium">Assignee</th>
            <th className="pb-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-gray-400 italic">
            <td className="py-3" colSpan={4}>No tasks yet</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
