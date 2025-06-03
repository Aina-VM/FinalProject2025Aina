<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="_handleLogIn" id="login-form">
      <label>
        Email
        <input type="email" v-model="email" required />
      </label>
      <label>
        Password
        <input type="password" v-model="password" required />
      </label>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="isLoggedIn" class="welcome">Welcome, {{ displayName }}! <br/> Click <RouterLink to="/tasks">here</RouterLink> to go to your tasks.</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { supabase } from '../api/supabase/index.js' 
import { useUserStore } from '../store/user.js'; // Import the user store
import { storeToRefs } from 'pinia'; // Import storeToRefs to destructure the store

const email = ref('');
const password = ref('');
const Name = ref('');
const errorMessage = ref('');
const successMessage = ref('');


const userStore = useUserStore(); // fetch the user store
const { user, name, isLoggedIn } = storeToRefs(userStore); // Destructure user from the store

const displayName = computed(() => user.value?.user_metadata?.first_name || 'Guest');

const _handleLogIn = async () => {
    if (!email.value || !password.value) {
      errorMessage.value = 'Please enter both email and password.';
      return;
    }
    try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) {
      errorMessage.value = error.message; // Set errorMessage for UI
      console.error('Sign-up error:', error.message);
    } else if (data && data.user) {
      // Handle successful sign-up
      userStore.setUser(data.user); // Save user data in Pinia store
      successMessage.value = 'Log-in successful!';
      console.log('User logged in:', user.first_name);

      // Clear inputs and errors
      email.value = '';
      password.value = '';
      errorMessage.value = '';
      window.location.href = '/tasks';
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
};

</script>

<style>
.login-container {
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
  margin: 5% auto;
  width: 90%;
  max-width: 400px;
  box-sizing: border-box;
}

#login-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.8em;
}

#login-form label {
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  gap: 0.3em;
}

#login-form input {
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

#login-form button {
  margin-top: 0.5em;
  padding: 0.6em;
  font-size: 1rem;
  background-color: #8f1a1a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#login-form button:hover {
  background-color: #a73232;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 1em;
  text-align: center;
}

.error {
  color: #ff8080;
  margin-top: 1em;
  text-align: center;
}

.welcome {
  margin-top: 1.5em;
  font-size: 1.1rem;
  line-height: 1.5;
  text-align: center;
  max-width: 350px;
}

/* Responsive Adjustments */
@media (max-width: 500px) {
  .login-container {
    padding: 1.5em;
  }

  h1 {
    font-size: 1.5rem;
  }

  #login-form input,
  #login-form button {
    font-size: 0.95rem;
  }

  .welcome {
    font-size: 1rem;
  }
}



</style>