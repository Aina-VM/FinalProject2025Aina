<script setup>
import { onMounted, onUnmounted, ref, watch, computed, reactive } from 'vue'
import { useTasksStore } from '../store/task.js'
import { storeToRefs } from 'pinia'

//const todos = reactive([])
const title = ref('')
const description = ref('')
const category = ref('')
//const createdAt = ref('')
//const id = ref('')

const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)

//const todos_asc = computed(() => todos.sort((a, b) => a.createdAt - b.createdAt))
const tasksSorted = computed(() =>
  [...tasks.value].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
)

//const todos_asc = computed(() => todos.value.sort((a, b) => {
   // return a.createdAt - b.createdAt
  // todos.value.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
   
//}))



const _handleSubmit = async () => {
    try {
        const now = new Date().toISOString()
        await tasksStore.addTask(title.value, description.value, category.value, now)



        title.value = ''
        description.value = ''
        category.value = ''
        console.log('Task added successfully!')
    } catch (err) {
        console.error(err)
    }
}


onMounted(() => {
    tasksStore.fetchTasks()
    console.log("Fetched tasks:", tasks.value);
})

//onUnmounted(() => {
//    tasksStore.$reset()
//})

const _handleDelete = async (task) => {
    try {
        await tasksStore.removeTask(task.id)
        console.log('Task deleted successfully!')
    } catch (err) {
        console.error(err)
    }
}

const handleDoneToggle = async (task) => {
  try {
    await tasksStore.updateTaskInTasks(task.id, { done: !task.done })
    console.log(`Task ${task.id} done state updated.`)
  } catch (err) {
    console.error('Failed to update task:', err)
  }
}

const handleTitleChange = (task) => {
  tasksStore.updateTaskinTasks(task.id, { title: task.title });
};

const handleDescriptionChange = (task) => {
  tasksStore.updateTaskinTasks(task.id, { description: task.description });
};

</script>

<template>
<section class="tasks-container">
  <div class="greetings">
    <h1>Welcome to your tasks!</h1>
    <p>Here you can add your tasks</p>
  </div>

  <div class="create-task">
    <h3>CREATE A TODO</h3>

    <h4>What is on your todo list?</h4>
    <form class="createTODO" @submit.prevent="_handleSubmit">
      <div class="textsCreate">
        <input type="text" placeholder="e.g. 10min meditation" v-model="title" id="addTitle"/>
        <input type="text" placeholder="Add more information if needed" v-model="description" id="addDescription"/>
      </div>
      
      <div class="category">
        <label  id="work">
          <input type="radio" name="category" value="work" v-model="category"/>
          <span class="bubble work"></span>
          <div>Work</div>
        </label>

        <label id="personal">
          <input type="radio" name="category" value="personal" v-model="category" />
          <span class="bubble personal"></span>
          <div>Personal</div>
        </label>
      </div>

      <input type="submit" value="Add task" id="addButton" />
    </form>
  </div>

   <div class="todo-list">
   <h3>TODO LIST</h3>
   <div class="list">
     <div v-for="task in tasksSorted" :key="task.id" :class="`todo-item ${task.done && 'done'}`">
       <label>
         <input type="checkbox" :checked="task.done" @change="() => handleDoneToggle(task)"/>
         <span :class="`bubble ${task.category}`"></span>
       </label>

       <div class="todo-content">
         <input type="text" v-model="task.title" @change="handleTitleChange(task)" />
         <input type="text" v-model="task.description" @change="handleDescriptionChange(task)" />
       </div>

       <div class="actions">
         <button class="deleteButton" @click="_handleDelete(task)">Delete</button>
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
        width: 80%;
        margin-top: 6%;
        margin-bottom: 6%;
        height: auto;
        min-height: 80%;
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

    .greetings {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin-bottom: 0px;
    }
    .create-task {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 70%;
        margin-bottom: 0px;
    }

    .textsCreate {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .createTODO {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        margin-bottom: 0px;
        gap: 5px;
    }

    #addTitle {
        width: 242px;
        padding: 5px;
        height: 24px;
        border: 0px;
        border-radius: 0px;
    }

    #addDescription {
        width: 242px;
        height: 65px;
        padding: 5px;
        border: 0px;
        border-radius: 0px;
    }

    

    .category {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        margin: 0px;
        padding: 5px;
        
    }
    
    #work {
        background-color: #008080;
        width: 100px;
        height: 55px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
        color: #3b0505;
        border-radius: 4px;
    }

    #personal {
        background-color: #ffcc00;
        width: 100px;
        height: 55px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
        color: #3b0505;
        border-radius: 4px;
    }

    #addButton {
        height: 50px;
        background-color: #250404;
        color: white;
        width: 100%;
    }


    .list {
        display: flex;
        flex-direction: row;
        gap: 20px;
    }
    .list label {
        margin-bottom: 10px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 7px;
    }
    .list input {
        padding: 2px 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 100%;
    }
    .list button {
        margin-top: 3px;
    }
    
    h1 {
        font-size: 1.7rem;
    }
</style>