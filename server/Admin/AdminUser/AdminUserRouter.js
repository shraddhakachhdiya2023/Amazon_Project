import express from "express";
import admminUserController from "./AdminUserController.js";


const AdminRouterUser = express.Router()



AdminRouterUser.post("/adduser", admminUserController.CreateAdminUser) // register user data add

AdminRouterUser.post("/login", admminUserController.AdminLogin)         // login user data add

AdminRouterUser.get("/getuser", admminUserController.GetAdminUser)      // user data get client side

AdminRouterUser.delete("/remove/:id", admminUserController.removeUser)      //user data delete for database

AdminRouterUser.put("/update/user/:id", admminUserController.updateUser)        // update





export default AdminRouterUser