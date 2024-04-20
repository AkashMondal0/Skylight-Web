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

            return res.status(400).json({
                code: 0,
                message: "Email and password is required",
                error_code: 400,
                data: {}
            })
        }

        const db_user = await db.select().from(users).where(eq(users.email, email));
        if (!db_user[0]) {
            return res.status(401).json({
                code: 0,
                message: "Email not found",
                error_code: 401,
                data: {}
            })
        }
        const checkPassword = await bcrypt.compare(password, db_user[0].password)

        if (!checkPassword) {
            const data = {
                code: 0,
                message: "Invalid credential",
                error_code: 400,
                data: {}
            }
            return res.status(401).json(data)
        }

        const token = jwt.sign({ email: db_user[0].email, id: db_user[0].id }, secret as string, { expiresIn: '1h' })

        return res.status(200).json(
            {
                code: 1,
                message: "Login successfully",
                error_code: 200,
                data: {
                    ...db_user[0],
                    token,
                }
            }
        )

    } catch (error: any) {
        console.log(error)
        res.status(500).json({
            code: 0,
            message: "Server Error Please Try Again - login route",
            error_code: 500,
            data: {}
        })
    }
})


AuthRouter.post("/register", ValidateMiddleware(zodUserSchema), async (req, res) => {
    try {
        const data = req.body
        if (!data.email && !data.password) {
            return res.status(400).json({
                code: 0,
                message: "Email and password is required",
                error_code: 400,
                data: {}
            })
        }
        const alreadyUser = await db.select().from(users).where(eq(users.email, data.email));

        if (alreadyUser[0] && alreadyUser[0]?.email === data.email) {
            return res.status(401).json({
                code: 0,
                message: "Email already exist",
                error_code: 401,
                data: {}
            })
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(data.password, salt);

        const newUser = await db.insert(users).values({
            email: data.email,
            password: hash,
            username: data.username,
        }).returning()
        const token = jwt.sign({ email: newUser[0].email, id: newUser[0].id }, secret as string, { expiresIn: '1h' })
        return res.status(200).json({
            code: 1,
            message: "Register successfully",
            error_code: 200,
            data: {
                ...newUser[0],
                token,
            }

        })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({
            code: 0,
            message: "Server Error Please Try Again - register route",
            error_code: 500,
            data: {}
        })
    }
})

AuthRouter.get("/authorization", verifyToken, async (req, res) => {
    try {
        const token = req.headers['authorization'];

        if (!token) {
            return res.status(404).json({
                code: 0,
                message: "Token is required",
                error_code: 404,
                data: {}
            })
        }

        const verify = jwt.verify(token, secret as string) as { email: string, id: string };

        if (!verify?.id) {
            return res.status(404).json({
                code: 0,
                message: "Invalid token",
                error_code: 404,
                data: {}
            })
        }

        const user = await db.query.users.findFirst({
            where(fields) {
                return eq(fields.id, verify.id)
            },
            with: {
                posts: {
                    limit: 9,
                }
            }
        })
        if (!user) {
            return res.status(404).json({
                code: 0,
                message: "User not found",
                error_code: 404,
                data: {}
            })
        }

        return res.status(200).json({
            code: 1,
            message: "Authorization successfully - user found",
            error_code: 200,
            data: user
        })
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({
            code: 0,
            message: "Server Error Please Try Again - authorize route",
            error_code: 500,
            data: {}
        })
    }
})

export default AuthRouter