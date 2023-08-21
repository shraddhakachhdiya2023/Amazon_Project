import mongoose from "mongoose";

class OrderModel {
    constructor() {
        this.scheema = mongoose.Schema({
            products: { type: Array, require: true },
            user: { type: Object, require: true },
            paymentMethod: { type: String, require: true, default: "cod" },
            paymentStatus:{type:String, require:true, default:"pending"},
            price:{type:Number, require:true},
            totalPrice:{type:Number, require:true},
            Shippingaddress:{type:Object, require:true},
            deliveryStatus:{type:String, require:true, default:"pending"},
            deliverdIn:{type:Date, require:true},
            

        },{timestamps:true})
    }
}

const order = new OrderModel()
const orderModel= mongoose.model("tbl_order",order.scheema)

export default orderModel

