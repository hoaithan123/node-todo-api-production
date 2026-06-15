const express = require("express")
const router = express.Router()
const { register, login } = require("../controllers/usercontroller")
/**
 * @swagger
 * /register: 
 *    post:
 *      summary: dang ky tai khoan moi
 *      requestBody: 
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *        200:
 *          description: dang ky thanh cong <3
 *        400:
 *          description: thieu thong tin hoacj tai khoan da ton tai
 */

router.post("/register", register)
/**
 * @swagger
 * /login:
 *    post:
 *      summary: dang nhap va nhan token JWT
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *        200:
 *          description: dang nhap thanh cong, tra ve token
 *        401:
 *          description: sai tai khoan hoac mat khau
 */
router.post("/login", login)
module.exports = router
