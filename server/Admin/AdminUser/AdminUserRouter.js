import express from "express";
import admminUserController from "./AdminUserController.js";
import mediaController from "../Media/MediaController.js";

const AdminRouter = express.Router()

AdminRouter.post("/upload", mediaController.Getmedia)
AdminRouter.get("/show", mediaController.ShowMedia)

AdminRouter.post("/adduser", admminUserController.CreateAdminUser)

AdminRouter.post("/login", admminUserController.AdminLogin)

AdminRouter.get("/getuser", admminUserController.GetAdminUser)

AdminRouter.delete("/remove/:id", admminUserController.removeUser)

AdminRouter.put("/update/user/:id", admminUserController.updateUser)


export default AdminRouter