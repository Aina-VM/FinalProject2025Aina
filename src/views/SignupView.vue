<script setup>
import { ref } from 'vue';
import { supabase } from '../api/supabase/index.js' 

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const _handleSignUp = async () => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: 'example@email.com',
      password: 'example-password',
    });

    if (error) {
      console.error('Sign-up error:', error.message);
    } else {
      console.log('User signed up successfully:', data);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
};

</script>

<template>
  <div>
    <h1>Sign Up</h1>
    <form @submit.prevent="handleSignUp">
      <label>
        Email:
        <input type="email" v-model="email" />
      </label>
      <label>
        Password:
        <input type="password" v-model="password" />
      </label>
      <button type="submit">Sign Up</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
    form {
        display: flex;
        flex-direction: column;
        max-width: 300px;
        margin: auto;
    }
    
    label {
        margin-bottom: 10px;
    }
    
    button {
        margin-top: 10px;
    }
    
    p {
        color: red;
    }
</style>