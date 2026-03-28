// Placeholder API client — Qoder will fill in real implementations
// using the DATABASE_URL and NEXT_PUBLIC_API_URL env vars.

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}

// Entities — types and fetchers. Qoder fills in the shapes.
export interface Project { id: string; name: string; createdAt: string; }
export interface Task { id: string; projectId: string; title: string; status: string; assigneeId?: string; createdAt: string; }

export const api = {
  projects: {
    list: () => get<Project[]>('/projects'),
    get: (id: string) => get<Project>(`/projects/${id}`),
    create: (data: Omit<Project, 'id' | 'createdAt'>) => post<Project>('/projects', data),
  },
  tasks: {
    list: () => get<Task[]>('/tasks'),
    listByProject: (projectId: string) => get<Task[]>(`/tasks?projectId=${projectId}`),
    create: (data: Omit<Task, 'id' | 'createdAt'>) => post<Task>('/tasks', data),
  },
};
