import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import apiHelper from "../common/ApiHelper"
import Loader from "../Components/Loader"
import Input from "../Components/Input"
import Valiadation from "../common/Validater"
import MessageBox from "../Components/MessageBox"

export default function RegisterScreen() {

    const [error, setError] = useState("")
    const [isSubmited, setisSubmited] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const redirect = location.search.split("?redirect=")[1]


    const [isLoading, setisLoading] = useState(false)
    const [RegisterError, setRegisterError] = useState([])



    const [user, setuser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        conformPassword: ""
    })


    const RegisterHandler = async () => {
        try {
            setisSubmited(true)
            const validationResult = Valiadation(user, "register")

            if (validationResult.length > 0) {
                setRegisterError(validationResult)
                return
            }

            setisLoading(true)

            const result = await apiHelper.RegisterUser(user)
         
            setisLoading(false)

            localStorage.setItem("userInfo", JSON.stringify(result.data.user))
            localStorage.setItem("token", JSON.stringify(result.data.user.token))

            if (redirect) {
                navigate("/shipping?redirect=payment")
                return
            }
            navigate("/")
            return


        } catch (error) {

            // console.log(error.response);
            setisLoading(false)

            if (error.response && error.response.data) {
                if (error.response.status === 400 && error.response.data && error.response.data.message === "Validation Error") {
                    setRegisterError(error.response.data.validationResult)
                    return
                }
                setError(error.response.data.message)

            } else {
                setError(error.message)

            }
        }
    }

    return (
        <>

            <div className="container h-100">
                <Loader isLoading={isLoading} />
                <MessageBox error={error} seterror={setError} />

                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black border border-0" >
                            <div className="card-body ">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1" style={{ marginTop: "-40px" }}>

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 " >Sign up</p>

                                        <form className="mx-1 mx-md-4 " style={{ marginTop: "-25px" }}>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw text-dark"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <Input type="text" placeholder="First Name" className="w-100"
                                                        onChange={(e) => {
                                                            setuser({ ...user, firstName: e.target.value })
                                                            if (isSubmited) {
                                                                const validationResult = Valiadation({ ...user, firstName: e.target.value }, "register")
                                                                setRegisterError(validationResult)
                                                            }
                                                        }}

                                                        value={user.firstName}
                                                        isError={RegisterError.find((x) => x.key === "firstName") ? true : false}
                                                        helperText={RegisterError.find((x) => x.key === "firstName")?.message}

                                                    />

                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw text-dark"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <Input type="text" placeholder="Last Name" className="w-100"
                                                        onChange={(e) => {
                                                            setuser({ ...user, lastName: e.target.value })
                                                            if (isSubmited) {
                                                                const validationResult = Valiadation({ ...user, lastName: e.target.value }, "register")
                                                                setRegisterError(validationResult)
                                                            }
                                                        }}
                                                        value={user.lastName}
                                                        isError={RegisterError.find((x) => x.key === "lastName") ? true : false}
                                                        helperText={RegisterError.find((x) => x.key === "lastName")?.message}

                                                    />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw text-dark"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <Input type="text" placeholder="Email" className="w-100"
                                                        onChange={(e) => {
                                                            setuser({ ...user, email: e.target.value })
                                                            if (isSubmited) {
                                                                const validationResult = Valiadation({ ...user, email: e.target.value }, "register")
                                                                setRegisterError(validationResult)
                                                            }

                                                        }}

                                                        value={user.email}
                                                        isError={RegisterError.find((x) => x.key === "email") ? true : false}
                                                        helperText={RegisterError.find((x) => x.key === "email")?.message}
                                                    />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw text-dark"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <Input type="password" placeholder="Password" className="w-100"
                                                        onChange={(e) => {
                                                            setuser({ ...user, password: e.target.value })
                                                            if (isSubmited) {
                                                                const validationResult = Valiadation({ ...user, password: e.target.value }, "register")
                                                                setRegisterError(validationResult)
                                                            }


                                                        }}
                                                        value={user.password}
                                                        isError={RegisterError.find((x) => x.key === "password") ? true : false}
                                                        helperText={RegisterError.find((x) => x.key === "password")?.message}

                                                    />

                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-key fa-lg me-3 fa-fw text-dark"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <Input type="password" placeholder="conformPassword" className="w-100"
                                                        onChange={(e) => {
                                                            setuser({ ...user, conformPassword: e.target.value })
                                                            if (isSubmited) {
                                                                const validationResult = Valiadation({ ...user, conformPassword: e.target.value }, "register")
                                                                setRegisterError(validationResult)
                                                            }


                                                        }}
                                                        value={user.conformPassword}
                                                        isError={RegisterError.find((x) => x.key === "conformPassword") ? true : false}
                                                        helperText={RegisterError.find((x) => x.key === "conformPassword")?.message}

                                                    />

                                                </div>
                                            </div>



                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="button" className="btn btn-primary btn-lg" onClick={RegisterHandler} >Register</button>
                                            </div>

                                        </form>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}