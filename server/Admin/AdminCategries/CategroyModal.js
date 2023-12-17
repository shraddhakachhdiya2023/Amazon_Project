import mongoose from "mongoose";

class AdminCategroyModal {
    constructor() {
        this.schema = new mongoose.Schema({
            name: { type: String, required: true },
            alias: { type: String, required: true, unqiue: true }
        },{timestamps:true})
    }
}

const category = new AdminCategroyModal()
const CategroyModal = mongoose.model("tbl_categroy", category.schema)
export default CategroyModal
