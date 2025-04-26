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