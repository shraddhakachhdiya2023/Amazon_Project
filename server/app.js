import express, { json } from "express";
import productController from "./Product/ProductController.js";
import cors from "cors"
import ConnectDb from "./Connection.js";
import uerController from "./User/UserController.js";
import { } from "dotenv/config.js"
import Authentication from "./Auth/Auth.js";
import orderController from "./Order/OrderController.js";
import fileUpload from "express-fileupload";
import AdminMediaRouter from "./Admin/Media/AdminMediaRouter.js";
import AdminRouterUser from "./Admin/AdminUser/AdminUserRouter.js";
import AdminProductRouter from "./Admin/AdminProduct/ProductRouter.js";
import CategroyRouter from "./Admin/AdminCategries/CategroyRouter.js";
import AdminProductController from "./Admin/AdminProduct/ProductController.js";




const app = express()
app.use(cors())
ConnectDb()
app.use(json())
app.use(fileUpload())

app.use("/uploads", express.static("./uploads"))

app.get("/", (req, res) => {
    return res.status(200).send({ message: "success" })
});

app.use("/admin", AdminRouterUser)
app.use("/admin", AdminMediaRouter)
app.use("/admin", AdminProductRouter)
app.use("/admin", CategroyRouter)


app.get("/product", productController.getProducts)

app.get("/product/:id", productController.getProductByID)

app.post("/cart", AdminProductController.Getcart)    //admin
// app.post("/user",uerController.addUser)

// app.get("/product/insert/many", productController.insertMany)

app.post("/user/login", uerController.UserLogin)

app.post("/user/register", uerController.RegisterUser)

app.post("/orderauth", Authentication.CreateOrderAuth, orderController.createOrder)

app.get("/order", Authentication.CreateOrderAuth, orderController.GetOrder)

app.get("/orders", orderController.getOrders)

app.get("/order/:id", orderController.getOrderByID)

app.post("/payment/verify", Authentication.CreateOrderAuth, orderController.PaymentVerify)



app.listen(process.env.PORT, () => {   //5000
    console.log("Server started");
})




// Validation({firstName:"shreya"},"register")
// console.log(process.env.JWT_SECRATE);