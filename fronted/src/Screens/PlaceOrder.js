/* eslint-disable react-hooks/exhaustive-deps */
// import { useState } from "react";
import { useEffect, useState } from "react";
import CheckoutStaps from "../Components/CheckoutStaps";
import apiHelper from "../common/ApiHelper";
import Loader from "../Components/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import FormatPrice from "../common/FormatPrice";
import HandlePayment from "./PaymentVerify";

export default function PlaceOrder(props) {
    let { cartItems, setCartItems } = props
    const [cart, setcart] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [setError] = useState("")

    const location = useLocation()
    const redirect = location.search.split("?redirect=")[1]
    const navigate = useNavigate()

    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")




    const [SummaryDetails, setSummaryDetails] = useState({
        totalAmount: 0,
        totalItems: 0,
        totalProducts: 0,
        delivery: 0,
        disconut: 0,
        text: 0,

    })
    useEffect(() => {
        let i = 0
        let totalPrice = 0
        let totalItems = 0
        let totalProducts = 0

        while (i < cart.length) {

            if (cart[i].countInStock > 0) {

                totalItems += cart[i].count
                totalPrice += (cart[i].count * cart[i].price)
                totalProducts++
            }
            i++
        }

        setSummaryDetails({ ...SummaryDetails, totalItems: totalItems, totalAmount: totalPrice, totalProducts: totalProducts })
    }, [cart])  //depencey



    useEffect(() => {
        cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]")
        setCartItems(cartItems)
    }, [])

    const getCart = async () => {
        setisLoading(true)
        const products = cartItems.map((x) => x.product)
        const result = await apiHelper.fetchCart(products)


        // stock outinstock after day to cart screen inform

        const InstockItems = result?.data?.products.filter((Item) => {
            return Item.countInStock > 0
        })

console.log(cart)

        //    cartItem_id  == InstockItems_id match compare

        let i = 0
        while (i < cartItems.length) {

            let j = 0
            while (j < InstockItems.length) {
                if (cartItems[i].product === InstockItems[j]._id) {
                    InstockItems[j].count = cartItems[i].count
                }
                j++
            }
            i++

        }

        setcart(InstockItems)
        setisLoading(false)


        try {
        } catch (error) {
            setisLoading(false)
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
            }
            setError(error.message)
            return
        }
    }

    useEffect(() => {
        getCart()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const placeOrederHamdler = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo") || "[]")
            // console.log(userInfo)   //shipping adress

            const paymentMethod = redirect && redirect === "online" ? "online" : "cod"
            // console.log(paymentMethod)

            const products = cart.map(({ _id, count, price }) => ({ _id, count, price }))
            // console.log(products)  //products details

            const OrderDetails = {
                userInfo: userInfo,
                paymentMethod: paymentMethod,
                products: products,
                Shippingaddress: userInfo.address,
                totalPrice: SummaryDetails.totalAmount
            }

            // console.log(OrderDetails)
            const result = await apiHelper.placeOrder(OrderDetails)
            console.log(result);
            // console.log(result.data.order);


            if (!result.data.order.razoerpayDetails) {
                return navigate("/order" + result.data.order._id)
            } else {

                const data = result.data.order
                // console.log(data)
                const Options = {
                    name: data.Shippingaddress.fullName,
                    phone: data.Shippingaddress.mobile,
                    email: data.Shippingaddress.email,
                    address: data.Shippingaddress.Address,
                    apikey: data.razoerpayDetails.apikey,
                    amount: data.razoerpayDetails.amount,
                    currency: data.razoerpayDetails.currency,
                    razorpayOrderId: data.razoerpayDetails.id,
                    orderId: data._id,
                    showError: setError,
                    navigate: navigate
                }
                HandlePayment(Options)
            }


        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>

            <div className="container pt-4">
                <Loader isLoading={isLoading} />
                <CheckoutStaps signin={true} shipping={true} payment={true} placeOrder={true} />
                <section className="h-100 gradient-custom">
                    <div className="container py-5">
                        <div className="row d-flex justify-content-center my-4">
                            <div className="col-md-8">
                                <div className="card mb-4 shadow">
                                    <div className="card-header py-3 bg-warning">
                                        <h5 className="mb-0  ">Review Your Order</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col  mb-lg-0">


                                                <h5>Shipping Imformation</h5>
                                                <div className="address d-flex mb-0 mt-4 mb-0">
                                                    <h6>Name:</h6>
                                                    <p className="ms-3">{userInfo.address.fullName}</p>
                                                </div>
                                                <div className="address d-flex " style={{ marginTop: "-10px", marginBottom: "-20px" }}>
                                                    <h6>Address:</h6>
                                                    <p className="ms-3">{userInfo.address.address}</p>
                                                </div>
                                                <div className="address d-flex " style={{ marginTop: "10px", marginBottom: "-20px" }}>
                                                    <h6>Phone no:</h6>
                                                    <p className="ms-3">{userInfo.address.phone}</p>
                                                </div>



                                            </div>

                                        </div>

                                        <hr className="my-4" />



                                        <div className="row">

                                            <div className="col  mb-lg-0">
                                                <h5>Payment Imformation</h5>
                                                <div className="address d-flex mb-0 mt-4 mb-0">
                                                    <h6>Payment Method:</h6>
                                                    <p className="ms-3">{redirect && redirect === "online" ? "online" : "cod"}</p>
                                                </div>

                                            </div>
                                        </div>

                                        <hr className="my-4" />
                                        <h5 className="mb-4">Order Imformation</h5>

                                        {
                                            cart.map((x,index) => {
                                                return (
                                                    <>
                                                        {/* <section className="" > */}
                                                            <div className="container py-3 h-100 border border-warning" style={{ backgroundColor: "#eee" }} key={index}>
                                                                <div className="row d-flex justify-content-center align-items-center h-100">
                                                                    <div className="col">
                                                                        <div className="card shadow">
                                                                            <div className="card-body p-4">

                                                                                <div className="row">

                                                                                    <div className="d-flex flex-row align-items-center text-center  justify-content-between  ">
                                                                                        <div >
                                                                                            <img
                                                                                                src={x?.image?.url}
                                                                                                className="img-fluid rounded-3" alt="Shopping item" style={{ height: "5rem" }} />
                                                                                        </div>
                                                                                        {/* <div className="ms-3 ">
                                                                                            <h5 className="mb-3">Name</h5>
                                                                                            <h5>{x.name}</h5>
                                                                                        </div> */}
                                                                                        <div className="ms-3 ">
                                                                                            <h5 className="mb-3">Quantity</h5>
                                                                                            <h6>{x.count}</h6>
                                                                                        </div>
                                                                                        <div className="ms-3 px-4">
                                                                                            <h5 className="mb-3">Price </h5>
                                                                                            <h5>{<FormatPrice price={x.price} />}</h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        {/* </section> */}

                                                    </>

                                                )

                                            })
                                        }



                                        <hr className="my-4" />
                                    </div>
                                </div>


                            </div>
                            <div className="col-md-4">
                                <div className="card mb-4 shadow">
                                    <div className="card-header py-3 bg-warning">
                                        <h5 className="mb-0">Order Summary</h5>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-group list-group-flush">
                                            <li
                                                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                Items
                                                <span>{SummaryDetails.totalItems}</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center border-0  px-0">
                                                Delivery
                                                <span> {SummaryDetails.delivery}</span>
                                            </li>

                                            <li
                                                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 ">
                                                Total
                                                <span>{<FormatPrice price={SummaryDetails.totalAmount} />}</span>
                                            </li>
                                            <li
                                                className="list-group-item d-flex justify-content-between align-items-center px-0 mb-3">
                                                Discount
                                                <span>&#x20B9;{SummaryDetails.disconut}</span>
                                            </li>

                                            <li
                                                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                <div>
                                                    <strong>Order Total </strong>

                                                </div>
                                                <span><strong>{<FormatPrice price={SummaryDetails.totalAmount} />}</strong></span>
                                            </li>
                                        </ul>

                                        <div className="button justify-content-center ">

                                            <button type="button " className="btn btn-outline-warning btn-lg w-100" onClick={placeOrederHamdler}>Place your order</button>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}