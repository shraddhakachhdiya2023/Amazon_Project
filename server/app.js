import express, { json } from "express";
import productController from "./Product/ProductController.js";
import cors from "cors"
import ConnectDb from "./Connection.js";
import uerController from "./User/UserController.js";
import { } from "dotenv/config.js"
import Authentication from "./Auth/Auth.js";
import orderController from "./Order/OrderController.js";
import AdminRouter from "./Admin/AdminUser/AdminUserRouter.js";
import fileUpload from "express-fileupload";



const app = express()
app.use(cors())
ConnectDb()
app.use(json())
app.use(fileUpload())

app.use("/uploads", express.static("./uploads"))

app.get("/", (req, res) => {
    return res.status(200).send({ message: "success" })
});

app.use("/admin", AdminRouter)

app.get("/product", productController.getProducts)

app.get("/product/:id", productController.getProductByID)

app.post("/cart", productController.Getcart)
// app.post("/user",uerController.addUser)

// app.get("/product/insert/many", productController.insertMany)

app.post("/user/login", uerController.UserLogin)

app.post("/user/register", uerController.RegisterUser)

app.post("/orderauth", Authentication.CreateOrderAuth, orderController.createOrder)

app.get("/order", Authentication.CreateOrderAuth, orderController.GetOrder)

app.get("/order/:id", orderController.getOrderByID)

app.post("/payment/verify", Authentication.CreateOrderAuth, orderController.PaymentVerify)



app.listen(process.env.PORT, () => {
    console.log("Server started");
})




// Validation({firstName:"shreya"},"register")
// console.log(process.env.JWT_SECRATE);