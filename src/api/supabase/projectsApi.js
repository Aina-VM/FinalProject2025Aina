import { supabase } from './index.js'

const TO_DO = 'tasks'

//read all projects
export const getAllTasks = async () => {
    try {
        const { data, error } = await supabase
            .from(TO_DO)
            .select() // fetch o traeme los datos
        if (error) {
            throw new Error(error.message) // si se ejecuta el error, lo que hay despres no se ejecuta
        }

        return data.map(task => ({
            id: task.id,
            createdAt: task.created_at,
            title: task.title,
            description: task.description,
        }))
    } catch (error) {
        console.error(error)
        return [];
    }
}

export const createTask = async (title, description) => {
    try {
        const userId = (await supabase.auth.getUser()).data.user.id // obtenemos el id del usuario logueado
        // hacemos peticion
        const { data, error } = await supabase
            .from(TO_DO)
            .insert({ title, description, user_id: userId}) // insertamos los datos
        
        //comprobamos si hay error
        if (error) {
            throw new Error(error.message)
        }
        //procesamos los datos

        //return datos
        return data
        } catch (error) {
        console.error(error)
        return [];
    }
}
    