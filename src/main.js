import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/index.js';
import { RouterLink } from 'vue-router';
import piniaPersist from 'pinia-plugin-persist'
import { supabase } from '../src/api/supabase/index.js'
import { useUserStore } from '../src/store/user.js';

const pinia = createPinia()
pinia.use(piniaPersist)

//createApp(App).use(router).use(pinia).mount('#app')


// to restore the user session when the app starts:

const restoreUserSession = async () => {
    const userStore = useUserStore(); // Call useUserStore after Pinia is initialized
    const { data: session, error } = await supabase.auth.getSession();
  
    if (session?.user) {
      userStore.setUser(session.user); // Restore user session
      console.log('Session restored:', session.user);
    } else if (error) {
      console.error('Error restoring session:', error.message);
    }
  };
  
  (async () => {
    const app = createApp(App); // Create app instance first
    app.use(pinia); // Apply Pinia to the app
    app.use(router); // Apply Router
    await restoreUserSession(); // Restore user session
    app.mount('#app'); // Mount the app after restoring the session
  })();
  

  //if it creates problems uncomment this line and comment the lines above till pinia.use...
//createApp(App).use(router).use(pinia).mount('#app')
