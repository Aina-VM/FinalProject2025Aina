import { defineStore } from 'pinia';
import { supabase } from '../api/supabase/index.js';

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
    
    async logout() {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Supabase logout error:', error.message);
      } else {
        this.user = null;
        this.name = '';
        this.isLoggedIn = false;
        localStorage.removeItem('user');
      }
    },

    async fetchUser() {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error.message);
        this.setUser(null);
      } else {
        this.setUser(user);
      }
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

