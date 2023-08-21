/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import apiHelper from "../common/ApiHelper"
import Loader from "../Components/Loader"
import MessageBox from "../Components/MessageBox"
import { useNavigate } from "react-router-dom"
import FormatPrice from "../common/FormatPrice"

export default function CartScreen(props) {
    let { cartItems, setCartItems } = props
    const navigate = useNavigate()
    const [cart, setcart] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState("")

    const [SummaryDetails, setSummaryDetails] = useState({
        totalAmount: 0,
        totalItems: 0,
        totalProducts: 0,
        delivery: 0,
        text: 0,

    })

// console.log(SummaryDetails)
// console.log(cart)


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
        // console.log(products)  //product id male 6
        const result = await apiHelper.fetchCart(products)
        // console.log(result)  //axios data backend thorogh

        // stock outinstock after day to cart screen inform

        const InstockItems = result?.data?.products
        // console.log(InstockItems)  //backend mathi products
        // const InstockItems = result.data.products.filter((Item) => {
        // return Item.countInStock > 0 ? (

        //     <span className="fs-6 success" style={{ color: '#20a020' }}>In stock</span>
        // ) : (
        //     <span className="fs-6 error" style={{ color: '#a02020' }}>Out of stock</span>

        // )
        // })



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
        // console.log(cartItems)

        setcart(InstockItems)
        // console.log(InstockItems)
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

    
    

    const RemoveHandler = (id) => {
        cartItems = cartItems.filter((x) => x.product !== id)
        // console.log(cartItems)
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
        setCartItems(cartItems)
        getCart()
    }


    const CheckcartHandler = () => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login?redirect=shipping")

        } else {

            navigate("/shipping?redirect=payment")
        }


        // localStorage.setItem("summaryDetails", JSON.stringify(SummaryDetails))
        // localStorage.setItem("cartInfo", JSON.stringify(cart))

    }

    // console.log(SummaryDetails)



    return (


        <section className="h-100 gradient-custom">
            <Loader isLoading={isLoading} />
            <MessageBox error={error} seterror={setError} />




            <div className="container " >
                <div className="row d-flex justify-content-center my-4">
                    <div className="col-md-8">
                        <div className="card rounded-3 shadow mb-4">
                            <div className="card-header py-3">
                                {
                                    cart.length <= 0 ? (<h5 className="text-danger">Your Amazon Cart is empty</h5>) : <h5 className="mb-0">Shopping Cart {cartItems.length}</h5>
                                }



                            </div>


                            {
                                cart && cart.map((x, key) => {
                                    return (
                                        <div className="card-body" key={key} >

                                            <div  className="row mt-4">
                                                <div className="col-lg-3 col-md-12  mb-lg-0">

                                                    <div className="bg-image hover-overlay hover-zoom ripple rounded" >
                                                        <img src={x.image} className="w-75" alt="Blue Jeans Jacket" />

                                                    </div>

                                                </div>

                                                <div className="col-lg-5 col-md-6  mb-lg-0">

                                                    <p style={{ marginTop: '0px' }}><strong>{x.name}</strong></p>
                                                    <p style={{ marginTop: '-10px' }}>Barnd Nike</p>
                                                    <p style={{ marginTop: '-10px' }}>Catergory: {x.category}</p>
                                                    <p style={{ marginTop: '-10px' }}>
                                                        {x.countInStock > 0 ? (

                                                            <span className="fs-6 success" style={{ color: '#20a020' }}>In stock</span>
                                                        ) : (
                                                            <span className="fs-6 error" style={{ color: '#a02020' }}>Out of stock</span>

                                                        )



                                                        }

                                                    </p>

                                                    <div className="qty " style={{ marginTop: "-10px" }}>

                                                        <span>Quantity : </span>

                                                        <select disabled={x.countInStock <= 0} value={x.count} className="bg-gradient bg-light rounded"
                                                            style={{ minWidth: "70px" }} onChange={(e) => {
                                                                cart[key].count = Number(e.target.value)
                                                                setcart([...cart])

                                                                // cartscreen qty updateed
                                                                let tmp = cart.map((x) => {
                                                                    return {
                                                                        product: x._id,
                                                                        count: x.count
                                                                    }
                                                                })
                                                                localStorage.setItem("cartItems", JSON.stringify(tmp))
                                                            }}>

                                                            {/* new arry creat for key =index creating for thr map method loop chalavay 6 */}
                                                            {
                                                                [...new Array(x.countInStock).keys()].map((n) => (
                                                                    <option value={n + 1} key={n + 1}> {n + 1} </option>
                                                                ))
                                                            }





                                                        </select>
                                                    </div>


                                                </div>

                                                <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">

                                                    <p className="text-start text-md-center fs-4 ms-5">
                                                        <strong >{<FormatPrice price={x.price} />}</strong>
                                                    </p>
                                                    <div className="delet ms-5">

                                                        <button type="button" className="btn btn-warning btn-sm  ms-5 mb-2 " onClick={() => RemoveHandler(x._id)} >
                                                            Delete
                                                        </button>

                                                    </div>

                                                </div>
                                            </div>


                                            <hr className="my-4" />



                                        </div>
                                    )
                                })
                            }

                        </div>


                    </div>
                    <div className="col-md-4">
                        <div className="card rounded-3 shadow mb-4">
                            <div className="card-header py-3">
                                <h5 className="mb-0">Summary</h5>
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li
                                        className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">

                                        Total Products
                                        <span>{SummaryDetails.totalProducts}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                        Total Items
                                        <span>{SummaryDetails.totalItems}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 ">
                                        Total Amount


                                        <span><strong>{<FormatPrice price={SummaryDetails.totalAmount} />}</strong></span>
                                    </li>
                                    <li
                                        className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                        <div>
                                            <strong>Subtotal</strong>

                                        </div>
                                        <span><strong>{<FormatPrice price={SummaryDetails.totalAmount} />}</strong></span>
                                    </li>
                                </ul>

                                <button onClick={(CheckcartHandler)} type="button" className="btn btn-warning btn-lg btn-block">
                                    Go to checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </section >

    )
}