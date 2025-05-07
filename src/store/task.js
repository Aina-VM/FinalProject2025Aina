// src/store/task.js
import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { createTask, getAllTasks } from '../api/supabase/projectsApi.js'

export const useTasksStore = defineStore('tasks', () => {
    // state
    const tasks = reactive([])

    // getters

    // actions
    async function addTask(title, description) {
        try {
            const data = await createTask(title, description)

            tasks.push(data) // lo meto en mi proyecto
        } catch (err) {
            console.error(err)
        }
    }


    async function fetchTasks() {
        try {
            const data = await getAllTasks()

            tasks.push(...data)
        } catch (err) {
            console.error(err)
        }
    }
return {
    // state
    tasks,
    // getters
    // actions
    addTask,
    fetchTasks,
    }
})