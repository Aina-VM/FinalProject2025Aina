<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <p>Welcome to the dashboard, {{ name }}! Here you can add, edit and eliminate tasks in your to-do list!</p>
    <p v-if="isLoggedIn">You are logged in!</p>
  </div>
  

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../store/user.js'; // Import the user store
import { useTasksStore } from '../store/task.js'; // Import the task store
import { storeToRefs } from 'pinia'; // Import storeToRefs to destructure the store
import { supabase } from '../api/supabase/index.js'
import { useRouter } from 'vue-router'; // Import useRouter for navigation

const email = ref('');
const password = ref('');
const Name = ref('');
const errorMessage = ref('');
const successMessage = ref('');


const userStore = useUserStore(); // fetch the user store
const { user, name, isLoggedIn } = storeToRefs(userStore); // Destructure user from the store

</script>

<style>

</style>