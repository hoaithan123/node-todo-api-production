
const prisma = require("../config/prisma")
async function getAllTodos(userId) {
    const todos = await prisma.todos.findMany({
        where: {
            user_id: userId
        }
    })
    return todos
}

async function getTodoById(id, userId) {
    const todo = await prisma.todos.findFirst({
        where: {
            id: Number(id),
            user_id: userId
        }
    })
    return todo ? [todo] : []

}

async function addTodo(todo) {
    const newTodo = await prisma.todos.create({
        data: {
            title: todo.title,
            completed: todo.completed,
            user_id: todo.userId
        }
    })
    return newTodo
}

async function updateTodo(todo) {
    try {
        const updateTodo = await prisma.todos.update({
            where:
            {
                id: Number(todo.id),
                user_id: todo.userId,
            },
            data:
            {
                title: todo.title,
                completed: todo.completed
            }
        })
        return updateTodo
    }
    catch (error) {
        return null
    }
}

async function deleteTodo(id, userId) {
    try {


        const deleteTodo = await prisma.todos.delete({
            where:
            {
                user_id: userId,
                id: Number(id)
            }
        })
        return true
    }
    catch (error) { return false }
}

module.exports = {
    getAllTodos,
    getTodoById,
    addTodo,
    updateTodo,
    deleteTodo
}