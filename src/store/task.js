// src/store/task.js
import { ref, computed, reactive, watch } from 'vue'
import { defineStore } from 'pinia'
import { createTask, getAllTasks } from '../api/supabase/projectsApi.js'

export const useTasksStore = defineStore('tasks', () => {
    // state
    const tasks = reactive([]) // ref you need to put task.value, with reactive justs tasks abans era reactive([]) com ho te en el video
    // 
    // persist to localStorage whenever tasks change
    watch(tasks, (newVal) => {
        localStorage.setItem('tasks', JSON.stringify(newVal))
    }, { deep: true })

    // load from localStorage on init, keeps data after refresh
    if (localStorage.getItem('tasks')) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'))
        storedTasks.forEach(task => tasks.push(task)) 
        
    }

    // getters

    // actions
    async function addTask(title, description, category, createdAt) {
        try {
            const data = await createTask(title, description, category, createdAt)

            tasks.push(data) // lo meto en mi proyecto
        } catch (err) {
            console.error(err)
        }
    }
    

    async function fetchTasks() {
        try {
            const data = await getAllTasks()
            data.forEach(task => tasks.push(task))
            //tasks.push(...data)
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