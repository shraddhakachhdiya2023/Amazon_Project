import Valiadation from "../../Valiadation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import adminUserModal from "./AdminUserModel.js";

class AdminUserController {
    async CreateAdminUser(req, res) {
        try {
            console.log(req.body)
            const validationResult = Valiadation(req.body, "adminUser")
            console.log(validationResult);

            if (validationResult.length > 0) {
                return res.status(400).send({ message: "Validation Error", validationResult: validationResult })
            }

            const { password } = req.body
            const EncodePassword = bcrypt.hashSync(password, 8)  //password increpte krva ma avel 6

            if (!EncodePassword) {
                return res.status(500).send({ message: "Somthing went wrong" })
            }

            req.body.password = EncodePassword
            const result = await adminUserModal.create(req.body)
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

    async AdminLogin(req, res) {
        try {
            const { email, password } = req.body

            const ValidationResult = Valiadation(req.body, "login")

            if (ValidationResult.length > 0) {
                return res.status(400).send({ message: "Validation Error", validationResult: ValidationResult })
            }

            const result = await adminUserModal.findOne({ email: email })
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
            console.log(error);
            return res.status(500).send({ message: "Internal server error" })


        }

    }

    async GetAdminUser(req, res) {
        try {
            const result = await adminUserModal.find({})
            if (!result) return res.status(400).send({ message: "Somthing went wrong" })

            return res.status(200).send({ message: "Success", user: result })
        } catch (error) {
            return res.status(500).send({ message: "Internal server error" })
        }
    }


    async removeUser(req, res) {
        try {
            const result = await adminUserModal.deleteOne({ _id: req.params.id })
            if (result) return res.status(200).send({ message: "Success" })
            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal Server error" })
        }
    }


    async updateUser(req, res) {
        try {
            const id = req.params.id
            const body = req.body
            const result = await adminUserModal.updateOne({ _id: id }, body)
            console.log(body)
            if (result.modifiedCount > 0 || result.matchedCount > 0) return res.status(200).send({ message: "Success" })

            return res.status(400).send({ message: "Somthing went wrong" })

        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server error" })
        }
    }
}

const admminUserController = new AdminUserController()
export default admminUserController