// src/store/task.js
import { ref, computed, reactive, watch } from 'vue'
import { defineStore } from 'pinia'
import { createTask, getAllTasks, updateTask, deleteTask } from '../api/supabase/projectsApi.js'

export const useTasksStore = defineStore('tasks', () => {
    // state
    const tasks = reactive([]) // ref you need to put task.value, with reactive justs tasks abans era reactive([]) com ho te en el video
    // 
    // persist to localStorage whenever tasks change
    // watch(tasks, (newVal) => {
    //     localStorage.setItem('tasks', JSON.stringify(newVal))
    // }, { deep: true })

    // // load from localStorage on init, keeps data after refresh
    // if (localStorage.getItem('tasks')) {
    //     const storedTasks = JSON.parse(localStorage.getItem('tasks'))
    //     storedTasks.forEach(task => tasks.push(task)) 
        
    // }

    // getters

    // actions
    async function addTask(title, description, category) {
    try {
        const data = await createTask(title, description, category) // pass values separately

        if (data && data.length > 0) {
            tasks.push(data[0]) // Supabase returns an array, push the first item
        }
    } catch (err) {
        console.error(err)
    }
}   
    

    async function fetchTasks() {
        try {
            const data = await getAllTasks()

            tasks.splice(0, tasks.length, ...data)
            //data.forEach(task => tasks.push(task))
            //tasks.push(...data)
        } catch (err) {
            console.error(err)
        }
    }

    // function to remove task from tasks array
    async function removeTask(id) {
        try {
            await deleteTask(id) // delete task from database
            // remove task from tasks array
            const index = tasks.findIndex(task => task.id === id)
            if (index !== -1) {
                tasks.splice(index, 1)
            }
        } catch (err) {
            console.error(err)
        }
        
    }

    // function to update task in tasks array

async function updateTaskInTasks(updatedTask) {
    try {
        await updateTask(updatedTask.id, updatedTask)
        const index = tasks.findIndex(task => task.id === updatedTask.id)
        if (index !== -1) {
            Object.assign(tasks[index], updatedTask)
        }
    } catch (err) {
        console.error('Failed to update task:', err)
    }
}


return {
    // state
    tasks,
    // getters
    // actions
    addTask,
    fetchTasks,
    removeTask,
    updateTaskInTasks,
    }
})