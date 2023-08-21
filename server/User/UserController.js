import userModal from "./UserModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import Valiadation from "../Valiadation.js";
// const JWT_SECRATE = "SOMTING_SECRATE"

class UserController {
    // async addUser(req, res) {
    //     try {
    //         //    console.log(req.body);

    //         let { firstName, lastName, email, password, isAdmin } = req.body
    //         password = bcrypt.hashSync(password, 8)

    //         const result = await userModal.create({ firstName, lastName, email, password, isAdmin: isAdmin || false })

    //      if (result) return res.status(200).send({ meassge: "success", result: result })
    //         return res.status(500).send({ message: "Sumthing went wrong" })
    //     } catch (error) {
    //         if (error.message.includes("E11000")) {
    //             return res.status(500).send({ message: "email allready exists" })
    //         }
    //         return res.status(500).send({ message: "Internal server error" })

    //     }
    // }




    //<============== User RegisterUser ===============>
    async RegisterUser(req, res) {
        try {
            const validationResult = Valiadation(req.body, "register")
            console.log(validationResult);
            if (validationResult.length > 0) {
                return res.status(400).send({ message: "Validation Error", validationResult: validationResult })
            }

            const { password } = req.body
            const EncodePassword = bcrypt.hashSync(password, 8)

            if (!EncodePassword) {
                return res.status(500).send({ message: "Somthing went wrong" })
            }

            req.body.password = EncodePassword
            const result = await userModal.create(req.body)
            console.log(result)
            if (!result) {
                return res.status(500).send({ message: "Somthing went wrong" })
            }

            let user = result._doc
            delete user.password

            const token = jwt.sign({ ...user }, process.env.JWT_SECRATE, { expiresIn: "30d" })
            if (!token) return res.status(500).send({ message: "Somthing went wrong" })

            return res.status(200).send({ message: "Success", user: { ...user, token: token } })

        } catch (error) {
            console.log(error);
            if (error && error.message && error.message.includes("E11000")) {
                return res.status(400).send({ message: "Validation Error", validationResult: [{ key: "email", message: "Email is Allready" }] })

            }
            return res.status(500).send({ message: "Internal server error" })

        }
    }



    //<------------------ User login ---------------->

    async UserLogin(req, res) {
        try {
            const { email, password } = req.body
            // if (!email) return res.status(400).send({ message: "Missing dependecy Email" })
            // if (!password) return res.status(400).send({ message: "Missing dependecy password" })

            const ValidationResult = Valiadation(req.body, "login")

            if (ValidationResult.length > 0) {
                return res.status(400).send({ message: "Validation Error", validationResult: ValidationResult })
            }

            const result = await userModal.findOne({ email: email })
            if (!result) return res.status(400).send({ message: "Validation Error", validationResult: [{ key: "email", message: "Email not found" }] })


            const user = result._doc

            if (!(bcrypt.compareSync(password, user.password))) {
                return res.status(400).send({ message: "Validation Error", validationResult: [{ key: "password", message: "Email and Password are not match" }] })
            }

            delete user.password
            const token = jwt.sign(user, process.env.JWT_SECRATE, { expiresIn: "30d" })
            if (!token) return res.status(500).send({ message: "Somthing went wrong" })

            user.token = token

            return res.status(200).send({ message: "Success", user: user })
        } catch (error) {
            // console.log(error);
            return res.status(500).send({ message: "Internal server error" })

        }
    }


}

const uerController = new UserController()
export default uerController