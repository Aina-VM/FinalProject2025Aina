import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null, // Replace with actual user data
    name: '', 
    isLoggedIn: false, // Replace with actual login state
  }),
  actions: {
    setUser(userData) {
      this.user = userData || null; 
      this.name = userData?.user_metadata?.Name || '';
      this.isLoggedIn = !!userData; // Set isLoggedIn dynamically
      localStorage.setItem('user', JSON.stringify(userData)); // Store user data in local storage
    },
    
    logout() {
      this.user = null;
      this.name = '';
      this.isLoggedIn = false;
      localStorage.removeItem('user'); // Remove user from localStorage
    },
  },
  persist: true,
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user, // Access user data easily
  },
  
});

export function initializeUserStore() {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    const userStore = useUserStore();
    userStore.setUser(JSON.parse(savedUser));
  }
}

