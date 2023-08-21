import { useEffect, useState } from "react";
import CheckoutStaps from "../Components/CheckoutStaps";
import { useLocation, useNavigate } from "react-router-dom";
import Valiadation from "../common/Validater";
import Loader from "../Components/Loader";
import MessageBox from "../Components/MessageBox";
import Input from "../Components/Input";

export default function ShippingScreen() {

    const [Address, setAddress] = useState({
        fullName: "",
        address: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        pincode: ""
    })
    const navigate = useNavigate()
    const [RegisterError, setRegisterError] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState("")
    const location = useLocation()
    const redirect = location.search.split("?redirect=")[1]


    const [isSubmited, setisSubmited] = useState(false)
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")


    useEffect(() => {
        if (!userInfo) {
            navigate("/")
        }
        // eslint-disable-next-line
    }, []);




    const ShippingHandler = () => {
        try {



            setisSubmited(true)
            const validationResult = Valiadation(Address, "shipping")

            if (validationResult.length > 0) {
                setRegisterError(validationResult)
                return
            }

            setisLoading(true)



            userInfo.address = Address

            localStorage.setItem("userInfo", JSON.stringify(userInfo))

            setisLoading(false)

            if (!redirect) {
                navigate("/")
            } else {
                navigate("/payment?redirect=placeorder")
                // navigate(`/${redirect}`)
            }

        }
        catch (error) {
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
            <div className="container pt-4">
                <CheckoutStaps signin={true} shipping={true} />
                <Loader isLoading={isLoading} />
                <MessageBox error={error} seterror={setError} />


                <div className="row d-flex justify-content-center align-items-center" >


                    <form >
                        <div className="col-xl-12 ">
                            <div className="card-body text-black justify-content-center">
                                <h3 className="my-3  mt-4 fs-4 text-uppercase text-center">Delivery Info</h3>

                                <div className="row ">
                                    <div className="col-md-12 mb-4">
                                        <div className="">
                                            <Input type="text" style={{ height: "40px" }}

                                                onChange={(e) => {
                                                    setAddress({ ...Address, fullName: e.target.value })
                                                    if (isSubmited) {
                                                        const validationResult = Valiadation({ ...Address, fullName: e.target.value }, "shipping")
                                                        setRegisterError(validationResult)
                                                    }
                                                }}

                                                value={Address.fullName}
                                                isError={RegisterError.find((x) => x.key === "fullName") ? true : false}
                                                helperText={RegisterError.find((x) => x.key === "fullName")?.message}


                                            />
                                            <label className="form-label">FullName</label>
                                        </div>
                                    </div>
                                </div>


                                <div className="form-outline mb-4">
                                    <Input type="text" style={{ height: "40px" }}
                                        onChange={(e) => {
                                            setAddress({ ...Address, address: e.target.value })
                                            if (isSubmited) {
                                                const validationResult = Valiadation({ ...Address, address: e.target.value }, "shipping")
                                                setRegisterError(validationResult)
                                            }
                                        }}
                                        value={Address.address}
                                        isError={RegisterError.find((x) => x.key === "address") ? true : false}
                                        helperText={RegisterError.find((x) => x.key === "address")?.message}


                                    />
                                    <label className="form-label" >Address</label>
                                </div>



                                <div className="row">
                                    <div className="col-md-6 mb-4">

                                        <select className="select"
                                            onChange={(e) => {
                                                setAddress({ ...Address, state: e.target.value })
                                            }}>

                                            <option>Gujrat</option>
                                            <option >Gujrat</option>
                                            <option >Gujrat</option>
                                            <option >Maharastra</option>


                                        </select>

                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-md-12 mb-4">
                                        <div className="form-outline">
                                            <Input type="text" style={{ height: "40px" }}

                                                onChange={(e) => {
                                                    setAddress({ ...Address, city: e.target.value })
                                                    if (isSubmited) {
                                                        const validationResult = Valiadation({ ...Address, city: e.target.value }, "shipping")
                                                        setRegisterError(validationResult)
                                                    }
                                                }}

                                                value={Address.city}
                                                isError={RegisterError.find((x) => x.key === "city") ? true : false}
                                                helperText={RegisterError.find((x) => x.key === "city")?.message}


                                            />
                                            <label className="form-label">City</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-outline mb-4">
                                    <Input type="text" style={{ height: "40px" }}
                                        onChange={(e) => {
                                            setAddress({ ...Address, pincode: e.target.value })
                                            if (isSubmited) {
                                                const validationResult = Valiadation({ ...Address, pincode: e.target.value }, "shipping")
                                                setRegisterError(validationResult)
                                            }
                                        }}

                                        value={Address.pincode}
                                        isError={RegisterError.find((x) => x.key === "pincode") ? true : false}
                                        helperText={RegisterError.find((x) => x.key === "pincode")?.message}

                                    />
                                    <label className="form-label" >Pin-code</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <Input type="tel" style={{ height: "40px" }}
                                        onChange={(e) => {
                                            setAddress({ ...Address, phone: e.target.value })
                                            if (isSubmited) {
                                                const validationResult = Valiadation({ ...Address, phone: e.target.value }, "shipping")
                                                setRegisterError(validationResult)
                                            }
                                        }}

                                        value={Address.phone}
                                        isError={RegisterError.find((x) => x.key === "phone") ? true : false}
                                        helperText={RegisterError.find((x) => x.key === "phone")?.message}

                                    />
                                    <label className="form-label">Phone</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <Input type="text" style={{ height: "40px" }}
                                        onChange={(e) => {
                                            setAddress({ ...Address, email: e.target.value })
                                            if (isSubmited) {
                                                const validationResult = Valiadation({ ...Address, email: e.target.value }, "shipping")
                                                setRegisterError(validationResult)
                                            }
                                        }}

                                        value={Address.email}
                                        isError={RegisterError.find((x) => x.key === "email") ? true : false}
                                        helperText={RegisterError.find((x) => x.key === "email")?.message}

                                    />
                                    <label className="form-label" >Email</label>
                                </div>

                                <div className="d-flex justify-content-center pt-3 ">
                                    <button type="button" className="border-0 btn-lg ms-2 text-light"
                                        style={{ background: "#ff8000" }} onClick={ShippingHandler}>Place order</button>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>


            </div>
        </>
    )
}