// Temporary auth simulation
const STORAGE_KEY = 'auth_user';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'host' | 'guest';
}

export async function signUp(email: string, password: string, name: string, role: 'host' | 'guest'): Promise<User> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const user = { id: crypto.randomUUID(), email, name, role };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

export async function signIn(email: string, password: string): Promise<User> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // For demo purposes, create a user if not exists
  const user = { id: crypto.randomUUID(), email, name: email.split('@')[0], role: 'guest' as const };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

export async function signOut(): Promise<void> {
  localStorage.removeItem(STORAGE_KEY);
}