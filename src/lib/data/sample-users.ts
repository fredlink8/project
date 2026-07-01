import { create } from 'zustand';

interface UserStore {
  currentRole: 'host' | 'guest';
  setRole: (role: 'host' | 'guest') => void;
}

export const useUserStore = create<UserStore>((set) => ({
  currentRole: 'guest',
  setRole: (role) => set({ currentRole: role }),
}));

export const sampleUsers = {
  host1: {
    id: 'host1',
    name: 'John Host',
    email: 'host@example.com',
    role: 'host'
  },
  guest1: {
    id: 'guest1',
    name: 'Alice Guest',
    email: 'guest@example.com',
    role: 'guest'
  }
} as const;

export const getCurrentUser = () => {
  const currentRole = useUserStore.getState().currentRole;
  return currentRole === 'host' ? sampleUsers.host1 : sampleUsers.guest1;
};

export const getPropertyHost = () => sampleUsers.host1;

export const toggleUserRole = () => {
  const store = useUserStore.getState();
  const newRole = store.currentRole === 'host' ? 'guest' : 'host';
  store.setRole(newRole);
  return getCurrentUser();
};