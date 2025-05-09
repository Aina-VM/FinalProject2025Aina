<script setup>
import { onMounted, onUnmounted, ref, watch, computed, reactive } from 'vue'
import { useTasksStore } from '../store/task.js'
import { storeToRefs } from 'pinia'

const todos = reactive([])
const title = ref('')
const description = ref('')
const category = ref('')
const createdAt = ref('')
const id = ref('')

//const todos_asc = computed(() => todos.sort((a, b) => a.createdAt - b.createdAt))
const todos_asc = computed(() => [...todos].sort((a, b) => a.createdAt - b.createdAt));

//const todos_asc = computed(() => todos.value.sort((a, b) => {
   // return a.createdAt - b.createdAt
  // todos.value.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
   
//}))

const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)

const _handleSubmit = async () => {
    try {
        const now = new Date().toISOString()
        await tasksStore.addTask(id.value, title.value, description.value, category.value, now)

        id.value = ''
        title.value = ''
        description.value = ''
        category.value = ''
        createdAt.value = ''
        console.log('Task added successfully!')
    } catch (err) {
        console.error(err)
    }
}


onMounted(() => {
    tasksStore.fetchTasks()
})

onUnmounted(() => {
  todos.length = 0; // Clears the array safely
});

const _handleDelete = async (task) => {
    try {
        await tasksStore.deleteTask(task.id)
        console.log('Task deleted successfully!')
    } catch (err) {
        console.error(err)
    }
}
// user id has to be passed in the task object



</script>

<template>
<section class="tasks-container">
  <div class="greetings">
    <h1>Welcome to your tasks!</h1>
    <p>Here you can add your tasks</p>
  </div>

  <div class="create-task">
    <h3>CREATE A TODO</h3>

    <form class="createTODO" @submit.prevent="_handleSubmit">
      <h4>What is on your todo list?</h4>
      <input type="text" placeholder="e.g. 10min meditation" v-model="title" />
      <input type="text" placeholder="Add more information if needed" v-model="description" />

      {{ title }}

      <div class="category">
        <label>
          <input type="radio" name="category" value="work" v-model="category" />
          <span class="bubble work"></span>
          <div>Work</div>
        </label>

        <label>
          <input type="radio" name="category" value="personal" v-model="category" />
          <span class="bubble personal"></span>
          <div>Personal</div>
        </label>
      </div>

      <input type="submit" value="Add task" />
    </form>
  </div>


  <div class="todo list">
    <h3>TODO LIST</h3>
    <div class="list">
        
        <div class="list">
            <div v-for="todo in todos_asc" :class="`todo-item ${todo.done && 'done'}`">

                <label>
                    <input type="checkbox" v-model="todo.done" />
                    <span :class="`bubble ${todo.category}`"></span>
                </label>

                <div class="todo-content">
                    <input type="text" v-model="todo.title" />
                    <input type="text" v-model="todo.description" />
                </div>

                <div class="actions">
                    <button class="deleteButton" @click="_handleDelete">Delete</button>
                </div>

            </div>
        </div>

    </div>

</div>

</section>



   

</template>
    
<style scoped>
    .tasks-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #3b0505;
        font-family: Arial, sans-serif;
        color: white;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 2em;
        border-radius: 10px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

    }
    form {
        display: flex;
        flex-direction: column;
        max-width: 250px;
        margin: 0 auto;
        width: 100%;
    }

    label {
        margin-bottom: 10px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 7px;
    }
    input {
        padding: 2px 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 100%;
    }
    button {
        margin-top: 3px;
    }
    
    h1 {
        font-size: 1.7rem;
    }
</style>