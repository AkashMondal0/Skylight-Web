/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express"
import ValidateMiddleware from "../../middleware/validate-middleware"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import zodUserSchema from "../../validator/user-validator"
import db from "../../db-connections/postgresql"
import { users } from "../../schema"
import { eq } from 'drizzle-orm';
import verifyToken from "../../middleware/verify-jwt.token"
const secret = process.env.JWT_SECRET
const saltRounds = 10
const AuthRouter = express.Router()


AuthRouter.get("/login", async (req, res) => {
    try {
        const email = req.headers['email'] as string;
        const password = req.headers['password'] as string;

        if (!email && !password) {
            return res.status(400).json({ message: "email and password is required" })
        }

        const db_user = await db.select().from(users).where(eq(users.email, email));
        if (!db_user[0]) {
            return res.status(401).json({ message: "email not found" })
        }
        const checkPassword = await bcrypt.compare(password, db_user[0].password)

        if (!checkPassword) {
            return res.status(401).json({ message: "invalid credential" })
        }

        const token = jwt.sign({ email: db_user[0].email, id: db_user[0].id }, secret as string, { expiresIn: '1h' })

        return res.status(200).json({
            token,
        })

    } catch (error: any) {
        console.log(error)
        res.status(500).json({ message: "Server Error Please Try Again" })
    }
})


AuthRouter.post("/register", ValidateMiddleware(zodUserSchema), async (req, res) => {
    try {
        const data = req.body
        if (!data.email && !data.password) {
            return res.status(400).json({ message: "email and password is required" })
        }
        const alreadyUser = await db.select().from(users).where(eq(users.email, data.email));

        if (alreadyUser[0] && alreadyUser[0]?.email === data.email) {
            return res.status(401).json({ message: "user already exist" })
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(data.password, salt);

        const newUser = await db.insert(users).values({
            email: data.email,
            password: hash,
            username: data.username,
        }).returning()
        const token = jwt.sign({ email: newUser[0].email, id: newUser[0].id }, secret as string, { expiresIn: '1h' })
        return res.status(200).json({ token })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ message: "Server Error Please Try Again" })
    }
})

AuthRouter.get("/authorization", verifyToken, async (req, res) => {
    try {
        const token = req.headers['authorization'];

        if (!token) {
            return res.status(404).json({ message: "Token not found" })
        }

        const verify = jwt.verify(token, secret as string) as { email: string };

        if (!verify?.email) {
            return res.status(404).json({ message: "Invalid token" })
        }

        const user = await db.select().from(users).where(eq(users.email, verify.email));

        return res.status(200).json(user[0])
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ message: "Server Error Please Try Again" })
    }
})

export default AuthRouter