import mongoose from "mongoose";

class ProductModal {
    constructor() {


        this.schema = new mongoose.Schema(
            {
                name: { type: String, require: true },
                alias: { type: String, require: true ,unique:true},
                category: { type: String, require: true },
                description: { type: String,default:null },
                brand: { type: String, require: true },
                image: { type: String, require: true },
                image1: { type: String, require: true },
                image2: { type: String, require: true },
                image3: { type: String, require: true },
                image4: { type: String, require: true },
                price: { type: String, require: true },
                rating: { type: Number, require: true },
                numReviews: { type: String, require: true },
                countInStock:{type:Number,require:true},
                
            }
        )
    }
}
const Product =new  ProductModal()
const productModal = mongoose.model("tbl_products", Product.schema)
export default  productModal 

