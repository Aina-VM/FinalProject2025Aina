<script setup>
import { ref, onMounted } from "vue";
import { supabase } from '../api/supabase/index.js' 

const alreadyLoggedOut = ref(false);

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession();
  alreadyLoggedOut.value = !session;
  if (session) {
    await logout();
  }
});

async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.log(error);
    }
    else {
        console.log("Sign out success")
    // Optionally, redirect to the login page after logout
    window.location.href = '/login'; // Or use Vue Router for programmatic navigation
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
        height: 150px;
        background-color: #3b0505;
        font-family: Arial, sans-serif;
        color: white;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 2em;
        border-radius: 10px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

    }
    form {
        display: flex;
        flex-direction: column;
        max-width: 250px;
        margin: 0 auto;
        width: 100%;
    }

    label {
        margin-bottom: 10px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 7px;
    }
    input {
        padding: 2px 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 100%;
    }
    button {
        margin-top: 3px;
    }
    
    h1 {
        font-size: 1.7rem;
    }
</style>