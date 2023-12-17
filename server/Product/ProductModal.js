import mongoose from "mongoose";

class ProductModal {
    constructor() {


        this.schema = new mongoose.Schema(
            {
                name: { type: String, required: true },
                brand: { type: String, required: true },
                alias: { type: String, required: true, unique: true },
                category: { type: mongoose.Types.ObjectId, required: true ,ref:"tbl_categroy"},
                description: { type: String, required: true },
                price: { type: String, required: true },
                countInStock: { type: Number, required: true },
                image: { type: mongoose.Types.ObjectId, required:true, ref: "tbl_Media"},
                RelevantImages: { type: Array, required: true },
                discount: { type: Number, required: true },
                totalPrice: { type: Number, required: true },
                rating: { type: Number, default: null },
                // numReviews: { type: String, required: true },

            }


           
        )
    }
}
const Product = new ProductModal()
const productModal = mongoose.model("tbl_products", Product.schema)
export default productModal

