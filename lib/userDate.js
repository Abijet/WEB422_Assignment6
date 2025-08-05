import { getToken } from './authenticate';

const API = `${process.env.NEXT_PUBLIC_API_URL}`;

export async function getFavourites() {
  const res = await fetch(`${API}/favourites`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error('Failed to fetch favourites');
  return await res.json();
}

export async function addToFavourites(id) {
  const res = await fetch(`${API}/favourites/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error('Failed to add favourite');
  return await res.json();
}

export async function removeFromFavourites(id) {
  const res = await fetch(`${API}/favourites/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error('Failed to remove favourite');
  return await res.json();
}

export async function getHistory() {
  const res = await fetch(`${API}/history`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error('Failed to fetch history');
  return await res.json();
}

export async function addToHistory(id) {
  const res = await fetch(`${API}/history/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error('Failed to add history');
  return await res.json();
}

export async function removeFromHistory(id) {
  const res = await fetch(`${API}/history/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error('Failed to remove history');
  return await res.json();
}
