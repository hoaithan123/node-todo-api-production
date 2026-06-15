const request = require("supertest")
const app = require("../src/app")
const prisma = require("../src/config/prisma")

let token = ""
let createdTodoId = null
beforeAll(async () => {
    await prisma.todos.deleteMany({
        where: {
            users: {
                username: {
                    startsWith: "test_"
                }
            }
        }
    })
    await prisma.users.deleteMany({
        where: {
            username: {
                startsWith:
                    "test_"
            }
        }
    }
    )
    await request(app)
        .post("/register")
        .send({
            username: "test_todo_user",
            password: "password123"
        })
    const loginRes = await request(app)
        .post("/login")
        .send({
            username: "test_todo_user",
            password: "password123"
        })


    token = loginRes.body.data
})

afterAll(async () => {
    await prisma.$disconnect()
})

describe("kiem thu cac api lien quan den todo ( can dang nhap", () => {
    it("khoa quyen truy cap (401) neu khong gui kem token", async () => {
        const res = await request(app)
            .get("/todos")
        expect(res.statusCode).toBe(401)
    })

    it("lay danh sach todo thanh cong (200) khi co token hop le", async () => {
        const res = await request(app)
            .get("/todos")
            .set("Authorization", `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(Array.isArray(res.body.data)).toBe(true)
    })
    it("them moi mot todo thanh cong", async () => {
        const res = await request(app)
            .post("/todos")
            .set("Authorization", `Bearer ${token}`).send({
                title: "test_todo_1",
                completed: false
            })
        expect(res.statusCode).toBe(201)
        expect(res.body.success).toBe(true)
        expect(res.body.data.title).toBe("test_todo_1")
        createdTodoId = res.body.data.id
    })
    it("lay chi tiet mot todo theo id thanh cong", async () => {
        const res = await request(app)
            .get(`/todos/${createdTodoId}`).set("Authorization", `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data[0].title).toBe("test_todo_1")
    })
    it("cap nhat mot todo theo id thanh cong", async () => {
        const res = await request(app)
            .put(`/todos/${createdTodoId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "test_todo_updated",
                completed: true
            })
        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data.title).toBe("test_todo_updated")
        expect(res.body.data.completed).toBe(true)
    })
    it("xoa mot todo theo id thanh cong", async () => {
        const res = await request(app)
            .delete(`/todos/${createdTodoId}`)
            .set("Authorization", `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
    })
    it("tra ve 404 neu lay chi tiet todo da bi xoa", async () => {
        const res = await request(app)
            .get(`/todos/${createdTodoId}`)
            .set("Authorization", `Bearer ${token}`)
        expect(res.statusCode).toBe(404)
    })
})