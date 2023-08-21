import Razorpay from "razorpay"
import DliveryDay from "../Constant.js"
import OrderModel from "./OrderModel.js"
import orderModel from "./OrderModel.js"




function CreateRozoerPayOrder(options) {
    return new Promise((reslove, reject) => {

        var instance = new Razorpay({
            key_id: process.env.API_KEY,
            key_secret: process.env.KEY_SECRATE,
        })

        instance.orders.create(options, (err, order) => {

            if (err) {
                return reject(err)
            }
            reslove(order)
        })
    })
}

class OrderController {
    async createOrder(req, res) {


        try {
            const { products, userInfo, paymentMethod, Shippingaddress, totalPrice } = req.body

            if (!products) {
                return res.status(400).send({ message: "Missing dependency product" })
            }

            if (!paymentMethod) {
                return res.status(400).send({ message: "Missing dependency paymentMethod " })
            }

            if (!Shippingaddress) {
                return res.status(400).send({ message: "Missing dependency address" })
            }



            const deliveryDate = new Date()

            deliveryDate.setDate(deliveryDate.getDate() + DliveryDay)

            const orderDetails = {
                products,
                userInfo: userInfo,
                paymentMethod: paymentMethod,
                totalPrice: totalPrice,
                Shippingaddress: Shippingaddress,
                deliverdIn: deliveryDate
            }


            let order = await OrderModel.create(orderDetails)
            order = { ...order._doc, razoerpayDetails: null }

            // console.log(order)

            if (paymentMethod === "cod") {
                if (!order) return res.status(500).send({ message: "Somthing went worng", order })
                return res.status(200).send({ message: "Sucees", order })
            } else {
                const options = {
                    amount: totalPrice * 100,
                    currency: "INR",
                    receipt: "rcpt_id_" + order._id
                }
                // console.log(options)
                const RozoerPayResult = await CreateRozoerPayOrder(options)
          

                if (!RozoerPayResult) return res.status(500).send({ message: "Somthing went worng" })
                order = {
                    ...order, razoerpayDetails: { ...RozoerPayResult, apikey: process.env.API_KEY }
                }
                return res.status(200).send({ message: "Scucess", order })
            }

        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server error " })

        }
    }


    async GetOrder(req, res) {
        try {
            const result = await OrderModel.find({ "user._id": req.body.userInfo._id })
            console.log(result)
            if (result) return res.status(200).send({
                message: "Sucess", order: result
            })

            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            console.log(error.message)
            return res.status(500).send({ message: "Somthing went wrong" })
        }
    }

    async getOrderByID(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).send({ message: "Bad request" })
            }
            const result = await OrderModel.findById({ _id: id })
            if (result) {
                return res.status(200).send({ message: "sucess", order: result })
            }
            return res.status(500).send({ message: 'something went wrong' })

        } catch (error) {
            return res.status(500).send({ message: "internal server error" })
        }
    }

    async PaymentVerify(req, res) {
        const { razorpay_payment_id, razorpayOrderId, orderId } = req.body
        const instance = new Razorpay({
            key_id: process.env.API_KEY,
            key_secret: process.env.KEY_SECRATE,
        })

        try {

            const response = await instance.payments.fetch(razorpay_payment_id)

            if ((response.status === "captured" || response.status === "authorized") && response.order_id === razorpayOrderId) {

                const update = await orderModel.updateOne({ _id: orderId }, { paymentStatus: "verify" })
                if (update.modifiedCount > 0) {
                    return res.status(200).send({ message: "Success", orderId: orderId })
                }
                return res.status(500).send({ message: "Somthing Went Wrong" })

            } else {
                await orderModel.updateOne({ _id: orderId }, { paymentStatus: "reject" })

                return res.status(400).send({ message: "Payment Verification Failed" })
            }

        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal Server Error" })
        }
    }
}

const orderController = new OrderController()
export default orderController