import type { Item } from '../types/item';

const API_URL = 'http://localhost:3000/api/items';

export async function getItems(): Promise<Item[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Erreur lors du chargement des biens');
  return res.json();
}

export async function getItem(id: string): Promise<Item> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Bien non trouvé');
  return res.json();
}

export async function createItem(item: Omit<Item, 'id'>): Promise<Item> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Erreur lors de la création');
  return res.json();
}

export async function updateItem(id: string, item: Partial<Item>): Promise<Item> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Erreur lors de la modification');
  return res.json();
}

export async function deleteItem(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Erreur lors de la suppression');
}
