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

export interface Contact { id: string; name: string; email?: string; phone?: string; createdAt: string; }
export interface Deal { id: string; contactId: string; title: string; value?: number; stage: string; createdAt: string; }
export interface Note { id: string; contactId?: string; dealId?: string; body: string; createdAt: string; }

export const api = {
  contacts: {
    list: () => get<Contact[]>('/contacts'),
    create: (data: Omit<Contact, 'id' | 'createdAt'>) => post<Contact>('/contacts', data),
  },
  deals: {
    list: () => get<Deal[]>('/deals'),
    create: (data: Omit<Deal, 'id' | 'createdAt'>) => post<Deal>('/deals', data),
  },
  notes: {
    list: () => get<Note[]>('/notes'),
    create: (data: Omit<Note, 'id' | 'createdAt'>) => post<Note>('/notes', data),
  },
};
