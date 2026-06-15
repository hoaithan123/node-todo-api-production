const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const { getUserByUsername, createUser } = require("../models/usermodel")
async function register(req, res, next) {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return next(new AppError("vui long nhap dung dinh dang tk va mk", 400))
        }
        const checkUserUsed = await getUserByUsername(username)
        if (checkUserUsed) {
            return next(new AppError("tai khoan da co nguoi su dung, vui long tao tai khoan khac", 400))
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        await createUser(username, hashedPassword)

        return res.status(200).json({ success: true, message: "dang ky thanh cong <3" })

    }
    catch (error) {
        next(error)
    }
}
async function login(req, res, next) {
    try {
        const { username, password } = req.body
        if (!username || !password) { return next(new AppError("Vui long nhap tai khoan va mat khau", 400)) }
        const checkUser = await getUserByUsername(username)
        if (!checkUser) {
            return next(new AppError("sai tai khoan hoac mat khau", 401))
        }
        const checkPassword = await bcrypt.compare(password, checkUser.password)
        if (!checkPassword) {
            return next(new AppError("sai tai khoan hoac mat khau", 401))
        }
        const payload = { id: checkUser.id, username: checkUser.username }

        const token = jwt.sign(payload, "MY_SUPER_SECRET_KEY", { expiresIn: "1h" })

        return res.status(200).json({ success: true, message: "dang nhap thanh cong", data: token })


    }
    catch (error) { next(error) }
}





module.exports = { register, login }