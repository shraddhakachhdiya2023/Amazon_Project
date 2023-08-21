import { useState } from "react"
import { useNavigate } from "react-router-dom"
import apiHelper from "../common/ApiHelper"
import Loader from "../Components/Loader"

export default function RegisterScreen() {


    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [conformPassword, setconformPassword] = useState("")
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [error, seterror] = useState("")
    const [isSubmited, setisSubmited] = useState(false)
    const navigate = useNavigate()
    const [isLoading, setisLoading] = useState(false)

    const RegisterHandler = async () => {
        try {
            setisSubmited(true)
            if (!firstName) {
                seterror("require filed firstName is empty")
                return

            } 
            if (!lastName) {
                seterror("require filed  lastName is empty")
                return

            } 
          
            if (!Email) {
                seterror("require filed email is empty")
                return

            } if (!(/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(Email))) {
                seterror("Invalid email ")
                return
            }

            if (!Password) {
                seterror("require filed password is empty")
                return;
            }
            if (!conformPassword) {
                seterror("require filed  conformassword is empty")
                return

            } 
            if (!(conformPassword === Password)) {
                seterror("not match conformassword")
                return

            } 
            setisLoading(true)

            const result = await apiHelper.RegisterUser({ firstName: firstName,lastName:lastName,email: Email, password: Password })

            setisLoading(false)

            if (result && result.status === 200) {

                localStorage.setItem("userInfo", JSON.stringify(result.data.user))
                localStorage.setItem("token", JSON.stringify(result.data.user.token))
                navigate("/")
            }


        } catch (error) {

            // console.log(error.response);
            setisLoading(false)

            if (error && error.response && error.response.data) {
                seterror(error.response.data.message)
            }
        }
    }

    return (
        <>

            <div className="container h-100">
                <Loader isLoading={isLoading} />
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
                                                    <input type="text"
                                                        onChange={(e) => {
                                                            setfirstName(e.target.value)

                                                            if (isSubmited) {

                                                                if (!firstName) {
                                                                    seterror("require filed firstName is empty")
                                                                    return

                                                                }
                                                                
                                                                seterror("")


                                                            }
                                                        }}
                                                        placeholder="First Name" className="w-100" />
                                                    {
                                                        error && (error.includes("firstName") || error.includes("firstName")) ? (
                                                            <span className="text-danger">{error}</span>
                                                        ) : ''
                                                    }
                                                    {/* <input type="text" id="form3Example1c" className="form-control" />
                                                    <label className="form-label" for="form3Example1c">First Name</label> */}
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw text-dark"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                <input type="text"
                                                        onChange={(e) => {
                                                            setlastName(e.target.value)

                                                            if (isSubmited) {

                                                                if (!lastName) {
                                                                    seterror("require filed lastName is empty")
                                                                    return

                                                                }
                                                                seterror("")


                                                            }
                                                        }}
                                                        placeholder="Last Name" className="w-100" />
                                                    {
                                                        error && (error.includes("lastName") || error.includes("lastName")) ? (
                                                            <span className="text-danger">{error}</span>
                                                        ) : ''
                                                    }
                                                    {/* <input type="text" id="form3Example1c" className="form-control" />
                                                    <label className="form-label" for="form3Example1c">Last Name</label> */}
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw text-dark"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="text"
                                                        onChange={(e) => {
                                                            setEmail(e.target.value)

                                                            if (isSubmited) {

                                                                if (!Email) {
                                                                    seterror("require filed email is empty")
                                                                    return

                                                                }
                                                                seterror("")

                                                                if (!(/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(Email))) {
                                                                    seterror("Invaid email ")
                                                                    return
                                                                }
                                                                seterror("")
                                                            }
                                                        }}
                                                        placeholder="Email" className="w-100" />
                                                    {
                                                        error && (error.includes("email") || error.includes("Email")) ? (
                                                            <span className="text-danger">{error}</span>
                                                        ) : ''
                                                    }
                                                    {/* <input type="email" id="form3Example3c" className="form-control" />
                                                        <label className="form-label" for="form3Example3c">Your Email</label> */}
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw text-dark"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="password" placeholder="Password"
                                                        onChange={(e) => {
                                                            setPassword(e.target.value)
                                                            if (isSubmited) {

                                                                if (!Password) {
                                                                    seterror("require filed password is empty")
                                                                    return
                                                                }
                                                                seterror("")
                                                            }

                                                        }} />

                                                    {
                                                        error && (error.includes("password") || error.includes("Password")) ? (
                                                            <span className="text-danger">{error}</span>
                                                        ) : ""
                                                    }

                                                           </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-key fa-lg me-3 fa-fw text-dark"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                <input type="password" placeholder="confromPassword"
                                                        onChange={(e) => {
                                                            setconformPassword(e.target.value)
                                                            if (isSubmited) {

                                                                if (!conformPassword) {
                                                                    seterror("require filed conformassword is empty")
                                                                    return
                                                                }
                                                                seterror("")

                                                                // if ( e.target.value !== Password ) {
                                                                //     seterror("conformassword not match")
                                                                //     return
                                                                // }
                                                                // seterror("")
                                                            }

                                                        }} />

                                                    {
                                                        error && (error.includes("conformassword") || error.includes("conformassword")) ? (
                                                            <span className="text-danger">{error}</span>
                                                        ) : ""
                                                    }
                                                    {/* <input type="password" id="form3Example4cd" class="form-control" />
                                                    <label class="form-label" for="form3Example4cd">Conform Password</label> */}
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