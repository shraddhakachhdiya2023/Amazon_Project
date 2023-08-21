import jwt from "jsonwebtoken"

class Authontroller {
    async CreateOrderAuth(req, res, next) {
        try {
            const { token } = req.headers
            // console.log(token)
            if (!token) {
                return res.status(401).send({ message: "unauthorized" })
            }
            return jwt.verify(token, process.env.JWT_SECRATE, (err, data) => {
                if (data) {
                    console.log(data)
                    req.body.userInfo = data
                    return next()
                }
                if (err) {
                    return res.status(401).send({ message: "unauthorized" })
                }
            })
        } catch (error) {
            console.log(error.message)
            return res.status(500).send({ message: "Internal server error" })
        }
    }
}

const Authentication = new Authontroller()
export default Authentication