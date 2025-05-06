<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

</script>

<template>
  <div class="card">
    <h1>{{ msg }}</h1>
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
