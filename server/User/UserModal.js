import mongoose from "mongoose";

class UserModal{
    constructor(){
        this.schema=mongoose.Schema({
            firstName:{type:String,require:true,length:20},
            lastName:{type:String,require:true,length:20},
            phone:{type:String,require:true,length:10,default:null},
            email:{type:String,require:true,length:20,unique:true},
            password:{type:String,require:true},
            isAdmin:{type:Boolean,require:true,default:false},
        },{timestamps:true})
    }
}

const User =new UserModal()
const userModal = mongoose.model("tbl_users", User.schema)
export default  userModal 