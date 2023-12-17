import mongoose from "mongoose";

class ProductModal {
    constructor() {


        this.schema = new mongoose.Schema(
            {
                name: { type: String, require: true },
                brand: { type: String, require: true },
                alias: { type: String, require: true ,unique:true},
                category: { type: String, require: true },
                description: { type: String,require:true },
                price: { type: String, require: true },
                countInStock:{type:Number,require:true},
                image:{type:mongoose.Types.ObjectId, require: true },
                RelevantImages:{type: Array, require: true },
                discount:{type:Number,require:true},
                totalPrice:{type:Number,require:true},
                rating: { type: Number, require: true,default:null },
                // numReviews: { type: String, require: true },
                
            }

///  ETXRA MODAL
           
        )
    }
}
const Product =new  ProductModal()
const AdminProductModal = mongoose.model("tbl_products", Product.schema)
export default  AdminProductModal 

