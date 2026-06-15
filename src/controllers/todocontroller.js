
const AppError = require("../utils/AppError")
const { getAllTodos, getTodoById, addTodo, updateTodo, deleteTodo } = require("../models/todomodel")
async function getTodo(req, res, next) {
    try {
        const userId = req.user.id
        const todos = await getAllTodos(userId)
        res.status(200).json({ success: true, message: "lay danh sach data thanh cong", data: todos })
    }
    catch (error) {
        next(error)
    }
}

async function getIdtodo(req, res, next) {
    try {
        const { id } = req.params
        const userId = req.user.id
        const todo = await getTodoById(id, userId)
        if (!todo.length) {
            return next(new AppError("khong tim thay todo", 404))
        }
        return res.status(200).json({
            success: true,
            message: "lay danh sach todo",
            data: todo
        })

    }
    catch (error) {
        next(error)
    }
}

async function addTodo1(req, res, next) {
    try {
        const { title, completed } = req.body
        if (!title || completed === undefined) {
            return next(new AppError("Vui long nhap dung dinh dang", 400))
        }
        const userId = req.user.id
        const todo = { title, completed, userId }
        const newtodo = await addTodo(todo)
        return res.status(201).json({
            success: true,
            message: "them todo thanh cong",
            data: newtodo
        })
    }
    catch (error) { next(error) }
}

async function updateTodo1(req, res, next) {
    try {
        const { id } = req.params
        const { title, completed } = req.body
        const userId = req.user.id
        if (!title || completed === undefined) {
            return next(new AppError("vui long nhap dung dinh dang", 400))
        }
        const todo = { id, title, completed, userId }
        const update = await updateTodo(todo)
        if (!update) {
            return next(new AppError("khong tim thay id de update", 404))
        }
        return res.status(200).json({ success: true, message: "cap nhat todo thanh cong", data: update })
    }
    catch (error) {
        next(error)
    }
}

async function deleteTodo1(req, res, next) {
    try {
        const { id } = req.params
        const userId = req.user.id
        const todo = await getTodoById(id, userId)
        if (!todo.length) {
            return next(new AppError("khong tim thay todo de xoa, 404"))
        }
        const delete1 = await deleteTodo(id, userId)
        return res.status(200).json({
            success: true,
            message: "xoa todo thanh cong"
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports = {
    getTodo,
    getIdtodo,
    addTodo1,
    updateTodo1,
    deleteTodo1
}
