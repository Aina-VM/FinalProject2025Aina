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
  [...tasks.value].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
)


//const todos_asc = computed(() => todos.value.sort((a, b) => {
   // return a.createdAt - b.createdAt
  // todos.value.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
   
//}))

const message = ref('');
const messageType = ref(''); // 'error' or 'success'

const _handleSubmit = async () => {
    try {
        message.value = ''
        messageType.value = ''

        if (!title.value.trim()) {
          message.value = 'Title is required.'
          messageType.value = 'error'
          return
        }

        if (!category.value.trim()) {
          message.value = 'Category is required.'
          messageType.value = 'error'
          return
        }
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

// const handleDoneToggle = async (task) => {
//   try {
//     await tasksStore.updateTaskInTasks(task.id, { done: !task.done })
//     console.log(`Task ${task.id} done state updated.`)
//   } catch (err) {
//     console.error('Failed to update task:', err)
//   }
// }

const handleDoneToggle = async (task) => {
  const updates = {
    id: task.id,
    done: !task.done,
  }
  console.log(`Updating task ${task.id} with:`, updates)

  try {
    await tasksStore.updateTaskInTasks(updates)
    console.log(`Task ${task.id} done state updated.`)
  } catch (err) {
    console.error('Failed to update task:', err)
  }
}


// Edit and save task:

const editingTaskId = ref(null)

const startEditing = (task) => {
  editingTaskId.value = task.id
}

const stopEditing = async (task) => {
  try {
    await tasksStore.updateTaskInTasks({
      id: task.id,
      title: task.title,
      description: task.description,
      category: task.category,
      done: task.done
    })
    editingTaskId.value = null
    console.log("Task updated.")
  } catch (err) {
    console.error("Failed to update task:", err)
  }
}

</script>

<template>
<section class="tasks-container">
  <div class="greetings">
    <h1>Your Tasks Dashboard</h1>
    <p>Create and organize your tasks below</p>
  </div>

  <div class="create-task">
    <h3>Add a New Task</h3>

    <h4>What do you need to do?</h4>
    <form class="createTODO" @submit.prevent="_handleSubmit">
      <div class="textsCreate">
        <input type="text" placeholder="e.g. 10min meditation" v-model="title" id="addTitle"/>
        <input type="text" placeholder="Add more information" v-model="description" id="addDescription"/>
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
        <div v-if="message" :class="messageType === 'error' ? 'text-red-500' : 'text-green-500'">
          {{ message }}
        </div>
    </form>
  </div>
  

   <div class="todo-list">
   <h3>Your Task List</h3>
   <div class="list">
     <div v-for="task in tasksSorted" :key="task.id" :class="['todo-item', { done: task.done }, task.category]">
       <label class="task-checkbox">
         <input type="checkbox" :checked="task.done" @change="() => handleDoneToggle(task)"/>
         <span :class="`bubble ${task.category}`"></span>
       </label>

       <div class="todo-content">
        <input
          type="text"
          v-model="task.title"
          :readonly="editingTaskId !== task.id" 
          :class="['todo-title', { done: task.done }, task.category]"
        />
        <input
          type="text"
          v-model="task.description"
          :readonly="editingTaskId !== task.id" 
          :class="['todo-description', { done: task.done }, task.category]"
        />
      </div>

      <div class="actions">
        <!-- Show Edit/Save bottons only if the task is NOT done -->
        <template v-if="!task.done">
          <button v-if="editingTaskId !== task.id" @click="startEditing(task)" class="edit-save">Edit</button>
          <button v-else @click="stopEditing(task)" class="edit-save">Save</button>
        </template>
  
        <!-- Delete button always shown -->
        <button class="deleteButton" @click="_handleDelete(task)">Delete</button>
      </div>
     </div>
   </div>
 </div>

  </section>
</template>


 
<style scoped>
    html, body {
        margin: 0 0;
        padding: 0;
        overflow: hidden; /* Prevents scrolling */
        height: 100%;
        width: 100%;
        box-sizing: border-box
    }

    * {
        box-sizing: border-box;
    }
    
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
        padding: 0.5rem 1rem;
        margin-bottom: 1rem;
        gap: 0.3rem;
    }

    .create-task {
      background: rgba(255, 255, 255, 0.05);
      padding: 1rem;
      border-radius: 6px;
      width: 100%;
    }
    
    .greetings h1 {
      font-size: 1.5rem;
      margin: 0;
      line-height: 1.2;
    }

    .greetings p {
      font-size: 0.95rem;
      margin: 0;
      line-height: 1.2;
      opacity: 0.85;
    }

    .create-task, .todo-list {
      width: 100%;
      align-items: flex-start; /* ⬅️ Align left */
      padding-left: 1rem;
    }

    .create-task h3,
    .todo-list h3 {
      font-size: 1.4rem;
      margin: 1rem 0 0.5rem;
      text-align: left;
    }

    .create-task h4 {
      font-size: 1.05rem;
      margin: 0.5rem 0;
      text-align: left;
      font-weight: 200;
    }

    .textsCreate {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .createTODO {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;
        gap: 10px;
    }

    #addTitle {
        min-width: 170px;
        padding: 5px;
        height: 22px;
        border: 0px;
        border-radius: 5px;
    }

    #addDescription {
        min-width: 170px;
        height: 44px;
        padding: 5px;
        border: 0px;
        border-radius: 4px;
    }

    .category {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        margin: 0px;
        padding: 0px 3px;
        font-size: 0.9rem;
    }
    
    #work {
        background-color: #008080;
        width: 70px;
        height: 33px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
        color: #3b0505;
        border-radius: 4px;
    }

    #personal {
        background-color: #ffcc00;
        width: 70px;
        height: 33px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
        color: #3b0505;
        border-radius: 4px;
    }

    #addButton {
        height: 70px;
        min-width: 90px;
        max-width: 120px;
        width: auto;
        font-size: 0.9rem;
        background-color: #28a745;   
        color: white;
        padding: 0px;
        border: none;
        border-radius: 6px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s ease, transform 0.1s ease;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
      
    #addButton:hover {
        background-color: #218838;
    }

    #addButton:active {
        transform: scale(0.97);
    }

    #addButton:focus {
        outline: 2px solid #155724;
        outline-offset: 2px;
    }

    .todo-list {
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      margin-top: 1.5rem;
      padding-top: 1rem;
    }
    /* Task borders based on category */
    .todo-item.work {
      border: 2px solid #008080;
      box-shadow: 0 0 10px #008080;
      border-radius: 5px;
      padding: 10px;
    }

    .todo-item.personal {
      border: 2px solid #ffcc00;
      box-shadow: 0 0 10px #ffcc00;
      border-radius: 5px;
      padding: 10px;
    }

    .todo-item {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 12px;
      margin: 10px 0;
      background-color: #fff;
      color: #000;
      border-radius: 8px;
      width: 100%;
      box-sizing: border-box;
      height: 65px;
      background-color: #5e3a3a;
    }

    .task-checkbox input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .todo-content {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .todo-item input[type="text"] {
      width: 100%;
      padding: 5px;
      border: none;
      border-radius: 1px;
      background-color: #d89d9d;
    }

    .todo-title {
      font-weight: bold;
      font-size: 0.9rem;
      color:#3b0505
    }

    .todo-description {
      font-weight: normal;
      font-size: 0.9rem;
      color: #333;
    }

    .actions {
      margin-left: auto;
      display: flex;
      gap: 3px;
      flex-direction: column;
    }

    .edit-save {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
      margin-right: 5px;
      width: 60px;
    }

    .deleteButton {
      background-color: #a00;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
      width: 60px;
    }

    .todo-item.done {
      background-color:#777; 
      color: #777;           
    }

    .todo-item.done input[type="text"] {
      background-color: #777;
      text-decoration: line-through;
    }

    .todo-title.done {
      color:#333;
      font-style: italic;
    }

    .todo-description.done {
      color: #545353;
      font-style: italic;
    }

    
    h1, h3 {
      font-size: 1.5rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-align: center;
    }

    @media (max-width: 600px) {
      html, body {
        overflow: auto; /* Allow scrolling on smaller screens */
        height: auto;
      }
      .tasks-container {
        width: 95%;
        padding: 1em;
      }

      #addTitle, #addDescription {
        max-width: 70vw;
      }

      #addButton {
        width: 70vw;
        max-width: 70vw;
        height: 30px;
      }

      .category {
        flex-direction: row;
        justify-content: center;
      }

      .create-task h3,
      .todo-list h3 {
        font-size: 1.3rem;
      }

      .greetings h1 {
        font-size: 1.4rem;
      }

      .greetings p {
        font-size: 0.8rem;
      }

      .create-task h4 {
        font-size: 0.8rem;
      }

    }

    @media (max-width: 300px) {
      .tasks-container {
        width: 95%;
        padding: 1em;
        overflow: auto;
        height: 100vh;
      }

      .create-task h3,
      .todo-list h3 {
        font-size: 1.1rem;
      }

      .greetings h1 {
        font-size: 1.2rem;
      }

      .greetings p, .create-task h4 {
        font-size: 0.7rem;
      }

      #addTitle, #addDescription {
        max-width: 70vw;
      }

      #addButton {
        width: 70vw;
        max-width: 70vw;
        height: 30px;
      }

      #work, #personal {
        width: 35vw;
      }

      .category {
        flex-direction: row;
        justify-content: center;
      }

      .todo-item {
        flex-direction: column;
        align-items: center;
        gap: 5px;
        padding: 1px;
        margin: 6px 0;
        height: 150px;
      }

      .todo-content {
        flex-direction: column;
        align-items: center;
        gap: 0px;
      }

      .actions {
        justify-content: center;
        align-items: center;
        margin-left: 0%;
        flex-direction: row;
      }

      .task-checkbox input[type="checkbox"] {
        width: 15px;
        height: 15px;
      }

      .todo-item input[type="text"] {
        width: 100%;
        padding: 5px;
        border: none;
        border-radius: 1px;
        background-color: #d89d9d;
      }

      .todo-title {
        font-weight: bold;
        font-size: 0.9rem;
        color:#3b0505
      }

      .todo-description {
        font-weight: normal;
        font-size: 0.9rem;
        color: #333;
      }
    }
</style>