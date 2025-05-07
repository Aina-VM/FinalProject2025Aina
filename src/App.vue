<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Navber from './components/Navbar.vue'
import { RouterView } from 'vue-router';





</script>

<template>
  <header>
    <Navber />
  </header>
  <main id="appi">
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
#appi {
  height: 100vh;
  background-color: #310303d0;
}

.background-container {
  position: relative;
  width: 100%;
  height: 70vh;
  overflow: hidden;
}
.logoback {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(1px);
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
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
