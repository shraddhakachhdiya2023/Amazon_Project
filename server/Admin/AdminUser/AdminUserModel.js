import mongoose from "mongoose"


class AdminUserModal {
    constructor() {
        this.schema = new mongoose.Schema({
            fullName: { type: String, required: true },
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true },
            role: { type: String, required: true }

        }, { timestamps: true })
    }
}

const adminUser = new AdminUserModal()
const adminUserModal = mongoose.model("tbl_Adminuser", adminUser.schema)
export default adminUserModal