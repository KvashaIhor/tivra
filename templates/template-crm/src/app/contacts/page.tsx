export default function ContactsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold">
          Add Contact
        </button>
      </div>
      {/* Qoder fills in real contact list */}
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-left text-gray-500">
            <th className="pb-3 font-medium">Name</th>
            <th className="pb-3 font-medium">Email</th>
            <th className="pb-3 font-medium">Phone</th>
            <th className="pb-3 font-medium">Created</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-gray-400 italic">
            <td className="py-3" colSpan={4}>No contacts yet</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
