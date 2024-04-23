/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express"
import db from "../../db-connections/postgresql"
const UserRouter = express.Router()

UserRouter.get("/all", async (req, res) => {
    try {
        const data = await db.query.users.findMany({
            with: {
                posts: true, 
            },
          });
        return res.status(200).json({
            code: 1,
            message: "Success",
            status_code: 200,
            data: data
        })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ message: "Server Error Please Try Again" })
    }
})


export default UserRouter