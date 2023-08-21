import { Link } from "react-router-dom"
import Rating from "./Rating"
import FormatPrice from "../common/FormatPrice"

export default function ProductCard(props) {
    const { product } = props

    return (
        <div className="card shadow mt-5 " style={{ width: "18rem" }}>
            <div className="img_div img-fluid">
                <Link to={`/product/${product._id}`} className="d-block mb-3">
                    <img src={product.image} className="card-img-top images " alt="..." />
                </Link>

            </div>
            <div className="card-body cards border border-none" >

                <h6 className="link">{product.name}</h6>
                <div className="d-flex gap-1 align-items-center">
                    <Rating rating={product.rating} />
                    <span>
                        {product.numReviews} reviews
                    </span>
                </div>
                <div className="d-flex justify-content-between mt-2">
                    <h5 className="fw-normal" style={{ color: "black" }}> {<FormatPrice price={product.price} />}</h5>
                    <span className="link">{product.brand}</span>
                </div>
            </div>
        </div>
    )
}