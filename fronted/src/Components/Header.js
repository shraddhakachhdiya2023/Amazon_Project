/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// import "../src/App.css";

export default function Header(props) {
    const { cartItems, setCartItems,  setSearch } = props


    const navigate = useNavigate()
    const { token, setToken } = props
    const { userInfo, setuserInfo } = props
    const [INPUT, setInput] = useState({ value: "" })
 
   
    useEffect(() => {
        setToken(localStorage.getItem("token"))
        setuserInfo(localStorage.getItem("userInfo"))
    }, [setToken, setuserInfo, navigate])



    // page load par cartitem check
    useEffect(() => {

        setCartItems(JSON.parse(localStorage.getItem("cartItems") || "[]"))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const SearchHandler = () => {
        setSearch(INPUT)
    }

    return (
        <div className="py-2 bg-dark d-sm-flex justify-content-sm-between px-4 header overflow-hidden flex-wrap">
            <div className="logo text-light  d-flex justify-content-center  align-items-center">
                <Link to={"/"}>
                    <img src="/images/logo.png" alt="logo" className="text-light mb-0 " style={{ height: "40px", width: "140px" }}></img>

                </Link>
            </div>

            <div className="d-flex align-items-center justify-content-center  mt-sm-0 mt-2 " >
                <div className=" rounded-start  input " style={{ width: "300px" }}  >
                    <input type="search" id="form1" value={INPUT.value} onChange={(e) => {
                        setInput({ ...INPUT, value: e.target.value })
                    }} placeholder="Search . . . " className="form-control rounded-start " />
                </div>
                <button type="button" onClick={SearchHandler} className="btn btn-warning" style={{ marginLeft: "-4px" }}>
                    <i className="fas fa-search text-dark"></i>
                </button>
            </div>


            <div className="icons d-flex justify-content-between align-items-center gap-3 mt-md-0 mt-2">
            {/* <i className="fa-solid fa-light fa-user"></i> */}
                <i style={{ fontSize: "1.2rem" }} className="fa-solid fa-cart-shopping text-light position-relative fs-4 " onClick={() => navigate("/cart")}>
                    <span style={{ fontSize: ".5rem" }} className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartItems.length}

                    </span>
                </i>
                <button className="btn btn-warning"
                    onClick={!token && !userInfo ? () => navigate("/login") : () => {
                        localStorage.removeItem('userInfo')
                        setuserInfo(localStorage.getItem("userInfo"))
                        localStorage.removeItem('token')
                        setToken(localStorage.getItem("token"))
                        navigate("/")
                    }
                    }>{!token && !userInfo ? "Signin" : "SignOut"}</button>
            </div>
        </div>
    )
}