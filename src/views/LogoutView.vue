<script setup>
import { ref, onMounted } from "vue";
import { supabase } from '../api/supabase/index.js';

const alreadyLoggedOut = ref(false);

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession();
  alreadyLoggedOut.value = !session;

  if (session) {
    setTimeout(async () => {
      await logout();
    }, 4000); // 4 seconds delay
  }
});

async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
  } else {
    console.log("Sign out success");
    window.location.href = '/login';
  }
}
</script>

<template>
    <div class="logout-container">
        <template v-if="!alreadyLoggedOut">
            <h1>Logging out...</h1>
            <button @click="logout()">Click to log in again</button>
        </template>
        <template v-else>
            <h1>You are already logged out!</h1>
            <p>Please <a href="/login">log in</a> to continue.</p>
        </template>
    </div>
</template>
  
  <style scoped>
  .logout-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #3b0505;
  font-family: Arial, sans-serif;
  color: white;
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  margin: 10% auto;
  width: 90%;
  max-width: 400px;
  box-sizing: border-box;
  text-align: center;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 0.5em;
}

p {
  font-size: 1rem;
  margin-bottom: 1em;
}

button {
  padding: 0.6em 1.2em;
  font-size: 1rem;
  background-color: #8f1a1a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #a73232;
}

/* Responsive Adjustments */
@media (max-width: 500px) {
  .logout-container {
    padding: 1.5em;
  }

  h1 {
    font-size: 1.5rem;
  }

  p,
  button {
    font-size: 0.95rem;
  }
}

</style>