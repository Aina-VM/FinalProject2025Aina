<script setup>
import { ref } from 'vue';
import { supabase } from '../api/supabase/index.js' 
import { useUserStore } from '../store/user.js'; // Import the user store
import { storeToRefs } from 'pinia'; // Import storeToRefs to destructure the store

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const successMessage = ref('');


const userStore = useUserStore(); // fetch the user store
const { user } = storeToRefs(userStore); // Destructure user from the store

const _handleSignUp = async () => {
    if (!email.value || !password.value) {
      errorMessage.value = 'Please enter both email and password.';
      return;
    }
    try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (error) {
      errorMessage.value = error.message; // Set errorMessage for UI
      console.error('Sign-up error:', error.message);
    } else if (data && data.user) {
      // Handle successful sign-up
      userStore.setUser(data.user); // Save user data in Pinia store
      successMessage.value = 'Sign-up successful! Please check your email to confirm.';
      console.log('User signed up:', data.user);

      // Clear inputs and errors
      email.value = '';
      password.value = '';
      errorMessage.value = '';
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
};


</script>

<template>
  <div>
    <h1>New here? Sign Up!</h1>
    <form @submit.prevent="_handleSignUp">
      <label>
        Email:
        <input type="email" v-model="email" required />
      </label>
      <label>
        Password:
        <input type="password" v-model="password" required />
      </label>
      <button type="submit">Sign Up</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <p v-if="successMessage" style="color: green;">{{ successMessage }}</p>
  </div>
</template>

<style scoped>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 60vh;
        background-color: #3b0505;
        font-family: Arial, sans-serif;
        color: white;
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