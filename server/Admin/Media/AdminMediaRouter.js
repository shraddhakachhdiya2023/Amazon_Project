import express from "express"
import mediaController from "./MediaController.js"

const AdminMediaRouter = express.Router()

AdminMediaRouter.post("/upload", mediaController.Getmedia)

AdminMediaRouter.get("/show", mediaController.ShowMedia)


export default AdminMediaRouter