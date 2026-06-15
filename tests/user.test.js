const request = require("supertest")
const app = require("../src/app")
const prisma = require("../src/config/prisma")
beforeAll(async () => {
    await prisma.users.deleteMany({
        where: {
            username: {
                startsWith: "test_"
            }
        }
    })
})

afterAll(async () => {
    await prisma.$disconnect()
})

describe("kiem thu cac api lien quan den user", () => {
    it("dang ky tai khoan moi thanh cong", async () => {
        const res = await request(app)
            .post("/register")
            .send({
                username: "test_username",
                password: "password123"
            })
        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)

    })



    it("dang ky that bai neu email da ton tai", async () => {
        const res = await request(app)
            .post("/register")
            .send(
                {
                    username: "test_username",
                    password: "password123"
                })
        expect(res.statusCode).toBe(400)
    })

    it("dang nhap thanh cong va nhan ve token JWT", async () => {
        const res = await request(app)
            .post("/login")
            .send({
                username: "test_username",
                password: "password123"
            })
        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(typeof res.body.data).toBe("string")
    })
    it("dang nhap that bai neu sai mat khau", async () => {
        const res = await request(app)
            .post("/login")
            .send({
                username: "test_username",
                password: "wrongpassword"
            })
        expect(res.statusCode).toBe(401)
    })
})