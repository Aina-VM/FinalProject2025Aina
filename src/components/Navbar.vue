<template>
    <div class="theTop">
    <RouterLink to="/" class="logo-link">
      <img src="../assets/list-to-do.png" class="logo vue" alt="To-do logo" />
    </RouterLink>
    <nav class="links">
      <RouterLink to="/tasks">Tasks</RouterLink>
      <RouterLink to="/login">Log In</RouterLink>
      <RouterLink to="/signup">Sign Up</RouterLink>
      <RouterLink to="/logout">Log Out</RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.theTop {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0em 1em;
  background-color: #768576;
  color: white;
  height: 5em;
  font-family: Arial, sans-serif;
}

.logo {
  height: 4em;
  padding: 0.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #630c0caa);
}
.links {
  display: flex;
  flex-direction: row;
  gap: 30px;
  justify-content: space-around;
  margin: 20px 0;
}

.links a {
  color: #143626;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 700;
}
</style>