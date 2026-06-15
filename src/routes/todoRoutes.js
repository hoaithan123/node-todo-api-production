const express = require("express")
const { validateCreateTodo } = require("../middlewares/validateTodo")
const { protect } = require("../middlewares/middlewares")
const router = express.Router()
const { getTodo, addTodo1, getIdtodo, deleteTodo1, updateTodo1 } = require("../controllers/todocontroller")
/**
 * @swagger
 * /todos:
 *    get:
 *      summary: lay danh sach todo cua user dang nhap
 *      security:
 *        -  bearerAuth: [] # yeu cau gui kem token jwt
 *      responses:
 *        200:
 *          description: lay danh sach thanh cong
 *        401:
 *          description: chua dang nhap hoac token sai
 */
router.get("/todos", protect, getTodo)
/**
 * @swagger
 * /todos:
 *      post:
 *        summary: them danh sach todo cua user dang nhap
 *        security:
 *          -  bearerAuth: [] # yeu cau gui kem token jwt
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  title:
 *                    type: string
 *                  completed:
 *                    type: boolean 
 *        responses:
 *          201: 
 *            description: them todo thanh cong
 *          400:
 *            description: nhap lieu khong hop le
 *          401: 
 *            description: chua dang nhap
 */
router.post("/todos", protect, validateCreateTodo, addTodo1)
/**
 * @swagger
 * /todos/{id}:
 *    get:
 *      summary: lay chi tiet 1 todo theo ID
 *      security:
 *        -  bearerAuth: []
 *      parameters:
 *        -  in: path
 *           name: id
 *           required: true
 *           schema:
 *              type: integer
 *           description: ID cua todo can lay
 *      responses:
 *        200:
 *          description: lay chi tiet thanh cong
 *        404: 
 *          description: khong tim thay todo hoac khong co quyen truy cap
 *        401:
 *          description: chua dang nhap
 */
router.get("/todos/:id", protect, getIdtodo)
/**
 * @swagger
 * /todos/{id}:
 *      delete:
 *        summary: xoa todo theo id
 *        security: 
 *          -  bearerAuth: []
 *        parameters:
 *          -  in: path
 *             name: id
 *             required: true
 *             schema:
 *                type: integer
 *             description: id cua todo can xoa
 *        responses:
 *            200: 
 *              description: xoa thanh cong
 *            404: 
 *              description: khong tim thay todo hoac khong co quyen truy cap
 *            401:
 *              description: chua dang nhap
 */
router.delete("/todos/:id", protect, deleteTodo1)
/**
 * @swagger
 * /todos/{id}:
 *    put:
 *      summary: cap nhat todo dua theo id
 *      security:
 *        -  bearerAuth: []
 *      parameters:
 *        -  in: path
 *           name: id
 *           required: true
 *           schema: 
 *              type: integer
 *           description: id cua todo can sua
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                completed:
 *                  type: boolean
 *      responses:
 *        200: 
 *          description: cap nhat thanh cong
 *        400:
 *          description: du lieu gui len khong hop le
 *        404:
 *          description: khong tim thay todo hoac khong co quyen truy cap
 *        401:
 *          description: chua dang nhap
 * 
 */
router.put("/todos/:id", protect, validateCreateTodo, updateTodo1)
module.exports = router