import React, { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Loader from "../Components/Loader"
import CheckoutStaps from "../Components/CheckoutStaps"
import Input from "../Components/Input"
import Valiadation from "../common/Validater"
import apiHelper from "../common/ApiHelper"
import MessageBox from "../Components/MessageBox"

export default function LoginScreen(props) {


    const [isSubmited, setisSubmited] = useState(false)
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [user, setuser] = useState({
        email: "",
        password: ""
    })
    const [isLoading, setisLoading] = useState(false)
    const [LoginError, setLoginError] = useState([])
    const location = useLocation()

    const redirect = location.search.split("?redirect=")[1]

    const { setToken } = props
    const { setuserInfo } = props
    const userInfo = localStorage.getItem("userInfo")
    const token = localStorage.getItem("token")
    useEffect(() => {
        if (token && userInfo) {
            navigate("/")

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])




    const LoginHandler = async () => {

        try {
            setisSubmited(true)
            const ValidationResult = Valiadation(user, "login")
            if (ValidationResult.length > 0) {
                setLoginError(ValidationResult)
                return
            }
            setisLoading(true)
            const result = await apiHelper.userLogin(user)
            localStorage.setItem("userInfo", JSON.stringify(result.data.user))
            setToken(token)
            setuserInfo(userInfo)
            localStorage.setItem("token", JSON.stringify(result.data.user.token))
            setisLoading(false)

            if (redirect) {
                navigate("/shipping?redirect=payment")
                return
            }
            navigate("/")
            return







        } catch (error) {
            setisLoading(false)

            if (error.response && error.response.data) {
                if (error.response.status === 400 && error.response.data && error.response.data.message === "Validation Error") {
                    setLoginError(error.response.data.validationResult)
                    return
                }
                setError(error.response.data.message)
                return
            } else {
                setError(error.message)

            }
        }
    }




    return (
        <div className="container pt-4">

            {
                redirect && <CheckoutStaps signin={true} />
            }
            <div className="d-flex justify-content-center  align-item-center pt-2" style={{ position: "relative" }}>


                <Loader isLoading={isLoading} />
                <MessageBox error={error} seterror={setError} />

                <div className="card shadow-lg mt-5 pt-2 " style={{ width: "25rem" }}>
                    <div className="px-4 py-2">
                        <h5 className="mb-0 text-center">
                            Login
                        </h5>
                    </div>
                    <div className="card-body bg-light">
                        <div className="row">
                            <div className="col-12 mb-2">
                                <Input type="text" placeholder="Email" className="w-100" 
                                    onChange={(e) => {
                                        setuser({ ...user, email: e.target.value })
                                        if (isSubmited) {
                                            const ValidationResult = Valiadation(user, "login")
                                            setLoginError(ValidationResult)
                                        }

                                    }}
                                    value={user.email}
                                    isError={LoginError.find((x) => x.key === "email") ? true : false}
                                    helperText={LoginError.find((x) => x.key === "email")?.message}
                                />


                            </div>
                            <div className="col-12 mb-2">
                                <Input type="password" placeholder="Password" className="w-100" 
                                    onChange={(e) => {
                                        setuser({ ...user, password: e.target.value })
                                        if (isSubmited) {
                                            const ValidationResult = Valiadation(user, "login")
                                            setLoginError(ValidationResult)
                                        }


                                    }}
                                    value={user.password}
                                    isError={LoginError.find((x) => x.key === "password") ? true : false}
                                    helperText={LoginError.find((x) => x.key === "password")?.message}


                                />


                            </div>


                            <div className="col-12 mb-2">
                                <center>
                                    <button onClick={LoginHandler} className="btn w-100 btn-warning">
                                        Singin
                                    </button>
                                    <span>or</span>
                                    <br />
                                    <Link className="link" to={!redirect ? "/register" : `/register${location.search}`}  >
                                        <span >Create an Account</span>
                                    </Link>

                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}