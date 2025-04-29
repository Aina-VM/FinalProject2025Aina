<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="_handleSubmit">
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
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const _handleLogIn = async () => {
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

<style>
.error {
  color: red;
  font-size: 0.9em;
  margin-top: 10px;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
}


</style>