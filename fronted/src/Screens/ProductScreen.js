import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Rating from "../Components/Rating";
import apiHelper from "../common/ApiHelper";
import Loader from "../Components/Loader";
import FormatPrice from "../common/FormatPrice";
import ReactImageMagnify from 'react-image-magnify';




export default function ProductScreen(props) {
    const { cartItems, setCartItems } = props
    // backend to data
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [count, setCounter] = useState(0)
    let [mainImage, setmainImage] = useState()

    const imageUrl = product.image ? product.image.url : "";
    // console.log(count)

    const Getproduct = async () => {
        try {
            setisLoading(true)

            const result = await apiHelper.fetchProductById(id)

            if (result.status === 200) {
                setProduct(result.data.Product)
                // setmainImage(result.data.Product.image?.url || ''); 
                setisLoading(false)
            }


        } catch (error) {
            setisLoading(false)
            console.log(error);
        }
    }


    useEffect(() => {
        Getproduct()
        Getproduct(mainImage)

        // setCartItems({ cartSize: cartItems.length })
        // eslint-disable-next-line
    }, [])



    useEffect(() => {
        setCounter(product.countInStock && product.countInStock > 0 ? 1 : 0)

        if (imageUrl) {
            setmainImage(imageUrl);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product])

    const AddToCart = () => {
        const cart = {
            product: id,
            count: count,
        }
        // prodct id check for cartscreen
        const findIndex = cartItems.findIndex((x) => x.product === id)
        console.log(findIndex)
        if (findIndex > -1) {
            cartItems[findIndex].count = cart.count
        } else {
            cartItems.push(cart)
        }

        // cartitems for local stroage set itmeans add product 
        // console.log(cartItems)
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
        setCartItems(cartItems)

        navigate("/cart")
    }





    return (
        <div className="container owerflow-hidden  " style={{ position: "relative" }} >
            <Loader isLoading={isLoading} />
            <div className="row mt-4 d-flex flex-wrap" >
                <div className="col-12 col-md-4 " >
                    <div className="img border border-3" style={{ objectFit: "cover" }}>

                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                isFluidWidth: true,
                                src: mainImage ? mainImage : "",
                            },
                            largeImage: {
                                src: mainImage ? mainImage : "",
                                width: 1000,
                                height: 1800
                            }
                        }} />
                    </div>
                    {/* <img src={mainImage} alt=""  className="border border-1 rounded-2"></img> */}
                </div>
                <div className="col-12 col-md-4">
                    <h6 className="link mt-3">{product.name}</h6>
                    <div
                        className="d-flex gap-1 align-items-center mt-2">
                        <Rating rating={product.rating} />
                        <span>
                            {product.numReviews} reviews
                        </span>
                    </div>

                    <div className="d-flex  mt-2">
                        <h4 className="fs-5 ">Price :</h4>
                        <span >
                            <h6 className="fs-5"> {<FormatPrice price={product.price} />}</h6> </span>
                    </div>
                    <div className="mt-1">
                        <h5 className="fs-5 mb-0">Description:</h5>
                        <span style={{ fontSize: ".899rem" }}> {product.description} <h6 className="mt-2">High quality product</h6></span></div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="box border border-1 w-100 bg-light px-2 py-3">
                        <ul className=" list-unstyled mb-0">
                            <li className="d-flex justify-content-between">
                                <h6 className="fs-5">Price</h6>
                                <span className="fs-6">   <h6 className="fs-5">{<FormatPrice price={product.price} />}</h6> </span>
                            </li>
                            <li className="d-flex justify-content-between my-3">
                                <h5 className="fs-6">Quentity</h5>
                                <span className="fs-6">
                                    <button disabled={product.countInStock <= 0 || count >= product.countInStock} onClick={() => setCounter(product.countInStock > count ? count + 1 : count)}>+</button>
                                    &nbsp;&nbsp;
                                    <button>{count}</button>
                                    &nbsp;&nbsp;
                                    <button disabled={count <= 0} onClick={() => setCounter(count > 0 ? count - 1 : count)}>-</button>
                                </span>

                            </li>
                            <li className="d-flex justify-content-between">
                                <h5 className="fs-6">Status</h5>
                                {product.countInStock > 0 ? (

                                    <span className="fs-6 success" style={{ color: '#20a020' }}>In stock</span>
                                ) : (
                                    <span className="fs-6 error" style={{ color: '#a02020' }}>Unavailable</span>

                                )}
                            </li>
                        </ul>
                        <button disabled={count <= 0} onClick={AddToCart} className="btn btn-warning w-100 mt-2" type="button">Add to cart</button>
                    </div>
                </div>
            </div>


            <div className="row mt-5 mb-5">

                <div className="col-4 d-flex justify-content-center flex-wrap">
                    {product.RelevantImages && product.RelevantImages.map((image, index) => (
               
                        <div className="col" key={index}>
                        
                            <img
                                className="border border-1 rounded-2"
                                src={image.url}
                                width="70"
                                height="70"
                                alt=""
                                onClick={() => setmainImage(image.url)}
                            />
                        </div>
                    ))}
                </div>
        \
            </div>

        </div>
    )
}




