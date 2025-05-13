import { supabase } from './index.js'

const Table = 'tasks'

//read all projects
export const getAllTasks = async () => {
    try {
        const { data, error } = await supabase
            .from(Table)
            .select() // fetch o traeme los datos
        if (error) {
            throw new Error(error.message) // si se ejecuta el error, lo que hay despres no se ejecuta
        }

        return data.map(task => ({
            id: task.id,
            createdAt: task.created_at,
            title: task.title,
            description: task.description,
            category: task.category,
            done: task.done,
        }))
    } catch (error) {
        console.error(error)
        return [];
    }
}

export const createTask = async (title, description, category) => {
    try {
        //const userId = (await supabase.auth.getUser()).data.user.id // obtenemos el id del usuario logueado
        // hacemos peticion

        // obtenemos el id del usuario logueado
        const { data: userData, error: userError } = await supabase.auth.getUser()

        if (userError || !userData?.user) {
            throw new Error('User is not authenticated')
        }

        const userId = userData.user.id


        const { data, error } = await supabase
            .from(Table)
            .insert({ title, description, category, user_id: userId, done: false}) // insertamos los datos
            .select() // seleccionamos los datos
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

export const updateTask = async (id, updates) => {
        // Fetch the authenticated user's ID
    const { data: userData, error: userError } = await supabase.auth.getUser()

    if (userError || !userData?.user) {
        throw new Error('User is not authenticated')
    }

    const userId = userData.user.id

    // Perform the update only if the user_id matches the authenticated user
    const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)
        .eq('user_id', userId)
        .select() //afegit ara

    if (error) {
        throw new Error(error.message)
    }

    return data[0] //estava sense el zero
}

export const deleteTask = async (id) => {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
}
    