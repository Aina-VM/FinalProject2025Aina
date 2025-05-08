<script setup>
import { watch, ref } from 'vue';
import { supabase } from '../api/supabase/index.js' 
import { useUserStore } from '../store/user.js'; // Import the user store
import { storeToRefs } from 'pinia'; // Import storeToRefs to destructure the store

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

defineProps({
  msg: String,
})

// Optional: set default name when user becomes available
watch(user, (newUser) => {
  if (newUser && !newUser.Name) {
    newUser.Name = 'Guest'
  }
})
</script>

<template>
  <div class="card">
    <h1>{{ msg }}</h1>
    <p v-if="user">Welcome {{ user.name || 'Guest' }}</p>
    <p>
      Create here your own To-Do Lists!
    </p>
  </div>
</template>

<style scoped>

* {
  margin: 0;
  padding: 0;
  background-color: transparent;
}
div {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  align-items: center;
  justify-content: center;
  height: 20%;
  background-color:transparent;
  font-family: Arial, sans-serif;
  height: 100%;

}
p {
  color: #c4c4c4;
}

</style>
