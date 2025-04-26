<script setup>
import { onMounted, ref } from 'vue'
import { useTasksStore } from '../store/task.js'
import { storeToRefs } from 'pinia'

const title = ref('')
const description = ref('')

const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)

const _handleSubmit = async () => {
    try {
        await tasksStore.addTask(title.value, description.value)

        title.value = ''
        description.value = ''
    } catch (err) {
        console.error(err)
    }
}

onMounted(() => {
    tasksStore.fetchTasks()
})

</script>

<template>
    <main>
        <h1>Tasks</h1>
        <form @submit.prevent="_handleSubmit"/>
            <label>
                Title
                <input type="text" v-model="title" />
            </label>
            <label>
                Description
                <input type="text" v-model="description" />
            </label>
            <button type="submit">Add Task</button>
    </main>
</template>
    
<style scoped>
    main {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }
</style>