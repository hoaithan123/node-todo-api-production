const jwt = require("jsonwebtoken")
const AppError = require("../utils/AppError")
function errorHandler(err, req, res, next) {
    let message = "co loi xay ra o he thong may chu"
    let statusCode = err.statusCode || 500
    if (err.isOperational) {
        message = err.message
    }

    return res.status(statusCode).json({ success: false, message: message })
}


async function protect(req, res, next) {
    try {
        let token
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1]
        }
        if (!token) {
            return next(new AppError("ban chua dang nhap, vui long dang nhap", 401))
        }
        const decode = jwt.verify(token, "MY_SUPER_SECRET_KEY")
        req.user = decode
        next()

    }
    catch (error) { return next(new AppError("token khong hop le hoac da het han", 401)) }
}
module.exports = { errorHandler, protect }