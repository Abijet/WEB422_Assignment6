import jwt_decode from 'jwt-decode';

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function removeToken() {
  localStorage.removeItem('token');
}

export function readToken() {
  const token = getToken();
  return token ? jwt_decode(token) : null;
}

export function isAuthenticated() {
  const token = readToken();
  return !!token;
}

export async function authenticateUser(user, password) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName: user, password })
  });
  if (!res.ok) throw new Error('Invalid credentials');
  const data = await res.json();
  setToken(data.token);
  return true;
}

export async function registerUser(user, password, password2) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName: user, password, password2 })
  });
  if (!res.ok) throw new Error('Registration failed');
  const data = await res.json();
  return true;
}