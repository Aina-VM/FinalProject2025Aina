import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router/index.js';
import piniaPersist from 'pinia-plugin-persist';
import { supabase } from './api/supabase/index.js'; 
import { useUserStore } from './store/user.js'; 


// ✅ Create Pinia instance
const pinia = createPinia();
pinia.use(piniaPersist); // ✅ Use persistence AFTER initializing Pinia

// ✅ Restore user session before app mounts
const restoreUserSession = async () => {
    const userStore = useUserStore(pinia); // ✅ Pass Pinia explicitly
    const { data: session, error } = await supabase.auth.getSession();

    if (session?.user) {
        userStore.setUser(session.user);
        console.log('Session restored:', session.user);
    } else if (error) {
        console.error('Error restoring session:', error.message);
    }
};

// ✅ Initialize Vue App with Pinia & Router
(async () => {
    const app = createApp(App);
    app.use(pinia); // ✅ Use Pinia BEFORE calling stores
    app.use(router);

    await restoreUserSession(); // ✅ Restore session before mounting the app

    app.mount('#app'); // ✅ Ensure this ID matches your index.html
})();

  //if it creates problems uncomment this line and comment the lines above till pinia.use...
//createApp(App).use(router).use(pinia).mount('#app')
