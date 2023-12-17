import express from "express"
import categroyController from "./CategroyController.js";

const CategroyRouter=express.Router()

CategroyRouter.post("/categroy", categroyController.addCategroy) // register user data add

CategroyRouter.get("/categroy",categroyController.getCategroy)

CategroyRouter.put("/categroy/:id",categroyController.updateCategroy)

CategroyRouter.delete("/removecategroy/:id",categroyController.removeCategroy)

export default CategroyRouter