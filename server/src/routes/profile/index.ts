/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express"
import db from "../../db-connections/postgresql"
import { users } from "../../schema"
const ProfileRouter = express.Router()

ProfileRouter.delete("/delete/:id", async (req, res) => {
    try {

        return res.status(200).json()
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ message: "Server Error Please Try Again" })
    }
})

ProfileRouter.get("/users", async (req, res) => {
    try {
        const data = await db.select().from(users)
        return res.status(200).json(data)
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ message: "Server Error Please Try Again" })
    }
})
export default ProfileRouter