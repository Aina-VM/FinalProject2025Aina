<template>
    <div class="theTop">
    <RouterLink to="/" class="logo-link">
      <img src="../assets/list-to-do.png" class="logo vue" alt="To-do logo" />
    </RouterLink>

    <button class="menu-toggle" @click="isMenuOpen = !isMenuOpen">
      ☰
    </button>

    <nav :class="['links', { open: isMenuOpen }]">
      <RouterLink to="/tasks">Tasks</RouterLink>
      <RouterLink to="/login">Log In</RouterLink>
      <RouterLink to="/signup">Sign Up</RouterLink>
      <RouterLink to="/logout">Log Out</RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const isMenuOpen = ref(false);
</script>

<style scoped>
.theTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em;
  background-color: #768576;
  color: white;
  height: 5em;
  font-family: Arial, sans-serif;
  position: relative;
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

.menu-toggle {
  display: none;
  font-size: 2rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.links {
  display: flex;
  flex-direction: row;
  gap: 30px;
  margin: 20px 0;
}

.links a {
  color: #143626;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 700;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .links {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #768576;
    flex-direction: column;
    align-items: flex-end;
    padding: 1em;
    display: none;
    gap: 15px;
    z-index: 1000;
  }

  .links.open {
    display: flex;
  }

  .theTop {
    flex-wrap: wrap;
  }
}

</style>