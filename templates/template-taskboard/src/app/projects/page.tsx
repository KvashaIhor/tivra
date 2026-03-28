import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold">
          New Project
        </button>
      </div>
      {/* Qoder will fill this with real project list from API */}
      <div className="grid gap-4">
        <ProjectRow name="— placeholder —" taskCount={0} />
      </div>
    </div>
  );
}

function ProjectRow({ name, taskCount }: { name: string; taskCount: number }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 flex items-center justify-between">
      <Link href={`/projects/placeholder`} className="font-medium text-gray-900 hover:text-indigo-600">
        {name}
      </Link>
      <span className="text-sm text-gray-500">{taskCount} tasks</span>
    </div>
  );
}
