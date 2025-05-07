import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router/index.js';
import piniaPersist from 'pinia-plugin-persist';
import { initializeUserStore } from './store/user'; // adjust path as needed

const pinia = createPinia();
pinia.use(piniaPersist); // ✅ Use plugin after initializing Pinia

const app = createApp(App);
app.use(pinia); // MUST be before using store
initializeUserStore(); // ✅ Now safe to call store
app.use(router);
app.mount('#app');

  //if it creates problems uncomment this line and comment the lines above till pinia.use...
//createApp(App).use(router).use(pinia).mount('#app')
