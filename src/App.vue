<script setup>
import HelloWorld from './components/HelloWorld.vue'




</script>

<template>
  <header>
    <navbar class="navbar">
    <a href="#" target="_blank">
      <img src="./assets/list-to-do.png" class="logo vue" alt="To-do logo" />
    </a>
    <nav class="links">
      <RouterLink to="/tasks">Tasks</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/signup">Sign Up</RouterLink>
    </nav>
  </navbar>
  </header>
  <main>
    <div class="background-container">
    <img src="./assets/lista-de-verificacion.png" class="logoback" alt="To-do logo" />
    <div class="text-overlay">
      <HelloWorld msg="To-Do App" />
    </div>
  </div>
  </main>
  


  
  <router-view></router-view>


</template>

<style scoped>
.navbar {
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

.background-container {
  position: relative;
  width: 100%;
  height: 50vh;
  overflow: hidden;
  background-color: #310303d0;
}
.text-overlay {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  background-color: transparent;
}
</style>
