<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from './store/user.js';
import Navber from './components/Navbar.vue'
import { RouterView } from 'vue-router';


const userStore = useUserStore();
const loading = ref(true);

onMounted(async () => {
  await userStore.fetchUser(); // ✅ Sincroniza sesión con Supabase
  loading.value = false;       // ✅ Ahora sí podemos mostrar la app
});

</script>

<template>
<div class="page-wrapper" v-if="!loading">
    <header>
      <Navber />
    </header>

    <main id="appi">
      <div class="background-container">
        <img src="./assets/lista-de-verificacion.png" class="logoback" alt="To-do logo" />
        <router-view />
      </div>
      
    </main>
</div>

<div v-else class="loading-screen">
    <p>Cargando sesión...</p>
</div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page-wrapper, html, body {
  margin: 0 0;
  padding: 0 0;
  height: 100vh;
  overflow: hidden; /* Or set overflow: auto if scroll needed */
  width: 100vw;
}

#appi {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.background-container {
  flex: 1;
  position: relative;
  background-color: #310303c7;
  overflow: auto;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 1rem;
}

router-view {
  position: absolute;
  top: 10px;
  z-index: 1;
  width: 90%;
  max-width: 600px;
}

.logoback {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(1px);
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.loading-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #310303c7;
  color: white;
  font-size: 1.2rem;
  font-family: Arial, sans-serif;
}

</style>
