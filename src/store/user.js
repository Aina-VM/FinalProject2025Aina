import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null, // Replace with actual user data
    isLoggedIn: false, // Replace with actual login state
  }),
  actions: {
    setUser(userData) {
      this.user = userData || null; 
      this.isLoggedIn = !!userData; // Set isLoggedIn dynamically
      localStorage.setItem('user', JSON.stringify(userData)); // Store user data in local storage
    },
    
    logout() {
      this.user = null;
      this.isLoggedIn = false;
      localStorage.removeItem('user'); // Remove user from localStorage
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user, // Access user data easily
  },
  
});

export const savedUser = localStorage.getItem('user');
if (savedUser) {
  userStore.setUser(JSON.parse(savedUser));
}

