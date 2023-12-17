import express from "express"
import AdminProductController from "./ProductController.js"

const AdminProductRouter=express.Router()

AdminProductRouter.post("/product",AdminProductController.adminproduct)   //product databasse ma add

AdminProductRouter.get("/getproduct",AdminProductController.GetAdminProducts)    //product data client side show for data grid

AdminProductRouter.delete("/removepro/:id", AdminProductController.removeProduct)   

AdminProductRouter.get("/editproduct/:id", AdminProductController.getAdminProductByID)  //product ni id  find through product edit 

AdminProductRouter.put("/updatepro/:id", AdminProductController.updateProduct)  //product data update

export default AdminProductRouter