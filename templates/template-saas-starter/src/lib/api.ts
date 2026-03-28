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

export interface User { id: string; email: string; name?: string; role: string; createdAt: string; }
export interface Team { id: string; name: string; createdAt: string; }
export interface Invite { id: string; email: string; teamId: string; token: string; accepted: boolean; createdAt: string; }

export const api = {
  users: {
    me: () => get<User>('/users/me'),
    update: (data: Partial<User>) => post<User>('/users/me', data),
  },
  teams: {
    list: () => get<Team[]>('/teams'),
    create: (data: Omit<Team, 'id' | 'createdAt'>) => post<Team>('/teams', data),
  },
  invites: {
    list: () => get<Invite[]>('/invites'),
    create: (data: { email: string; teamId: string }) => post<Invite>('/invites', data),
  },
};
