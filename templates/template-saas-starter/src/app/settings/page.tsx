export default function SettingsPage() {
  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      {/* Qoder fills with real account/billing forms */}
      <section className="mb-8">
        <h2 className="text-base font-semibold mb-3">Account</h2>
        <div className="rounded-xl border border-gray-200 bg-white p-4 flex flex-col gap-3">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-gray-500">Name</span>
            <input className="rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Your name" />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-gray-500">Email</span>
            <input className="rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="you@example.com" />
          </label>
          <button className="self-start px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold">Save</button>
        </div>
      </section>
    </div>
  );
}
