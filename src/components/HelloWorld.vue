<script setup>
import { watch, ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { supabase } from '../api/supabase/index.js' 
import { useUserStore } from '../store/user.js'; // Import the user store
import { storeToRefs } from 'pinia'; // Import storeToRefs to destructure the store

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const route = useRoute();
const router = useRouter();
const mensaje = ref(route.query.mensaje || null);

// Mostrar mensaje inicial si viene en la URL
onMounted(() => {
  console.log('User data:', user.value);
  if (mensaje.value) {
    iniciarTemporizadorMensaje();
  }
});

// Reaccionar si cambia el query string (ej: mensaje=ya-logueado)
watch(() => route.query.message, (nuevoMensaje) => {
  if (nuevoMensaje) {
    mensaje.value = nuevoMensaje;
    iniciarTemporizadorMensaje();
  }
}, { immediate: true });

function iniciarTemporizadorMensaje() {
  setTimeout(() => {
    mensaje.value = null;
    router.replace({ path: route.path, query: {} }); // limpia el query string
  }, 7000);
}
// Update computed property to reflect the correct name path
const displayName = computed(() => user.value?.user_metadata?.first_name || 'Guest');


</script>

<template>
  <div class="card">
    <h1>Welcome to Your Task Hub!</h1>
    <p v-if="mensaje === 'ya-logueado'" style="color: lightblue; font-weight: bold;">Ya estás logueado.</p>
    <p v-else-if="mensaje === 'ya-registrado'" style="color: lightblue; font-weight: bold;">Ya estás registrado. Si quieres crear otra cuenta, por favor cierra sesión primero.</p>
    <p v-if="mensaje === 'logout-ok'" style="color: lightblue; font-weight: bold;">Has cerrado sesión correctamente.</p>
    <h4 v-if="user">Dear {{ displayName }}, let's get things done! </h4>
    <h4 v-else>Please create an account or log in.</h4>
    <p>
      Start creating your personalized tasks and manage your life better.
    </p>
  </div>
</template>

<style scoped>

.card {
  width: 100%;
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #1e1e1e;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #e0e0e0;
}

h1 {
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 1rem;
}

h4 {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #c4c4c4;
}

p:first-of-type {
  font-weight: 600;
  color: #ffdd57;
}

@media (max-width: 600px) {
  .card {
    padding: 1.5rem;
    margin: 1rem;
  }

  h1 {
    font-size: 1.3rem;
  }

  h4, p {
    font-size: 0.8rem;
  }
}
</style>
