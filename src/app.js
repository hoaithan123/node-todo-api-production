require('dotenv').config()
const express = require("express")
const app = express()
app.use(express.json())
const swaggerUi = require("swagger-ui-express")
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "todo app api",
            version: "1.0.0",
            descripsion: "tai lieu api cho ung dung todo app backend"
        },
        servers: [{
            url: "http://localhost:3000"
        }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    apis: ["./src/routes/*.js"]
}
const swaggerDocs = swaggerJsdoc(swaggerOptions)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
const todoRoutes = require("./routes/todoRoutes")
const { errorHandler } = require("./middlewares/middlewares")
const userRoutes = require("./routes/userRoutes")
app.use(todoRoutes)
app.use(userRoutes)
app.use(errorHandler)
module.exports = app

