export default function CheckoutStaps(props) {
    const { signin, shipping, payment, placeOrder } = props

    return (
        <>
            <div className="row">

                <div className="col-3 " style={{ paddingTop: "5px", borderTop: signin ? "3px solid #ff8000" : "3px solid gray" }}>
                    <div className="rounded-circle align-items-center d-flex justify-content-center"
                        style={{ height: "25px", width: "25px", background: signin ? "#ff8000" : "gray", marginTop: "-19px", marginLeft: "-13px" }}>


                        {signin ?
                            <i className="fa-sharp fa-regular fa-circle-check text-light " style={{ fontSize: "14px" }}></i> :
                            <i className="fa-regular fa-circle text-light" style={{ fontSize: "13px" }}></i>

                        }
                    </div>
                    <h5 style={{ marginLeft: "-27px", color: signin ? "#ff8000" : "gray" }}>Signin</h5>
                </div>

                <div className="col-3 " style={{ paddingTop: "5px", borderTop: shipping ? "3px solid #ff8000" : "3px solid gray" }}>
                    <div className="rounded-circle align-items-center d-flex justify-content-center"
                        style={{ height: "25px", width: "25px", background: shipping ? "#ff8000" : "gray", marginTop: "-19px", marginLeft: "-13px" }}>


                        {shipping ?
                            <i className="fa-sharp fa-regular fa-circle-check text-light " style={{ fontSize: "14px" }}></i> :
                            <i className="fa-regular fa-circle text-light" style={{ fontSize: "13px" }}></i>

                        }
                    </div>

                    <h5 style={{ marginLeft: "-27px", color: shipping ? "#ff8000" : "gray" }}>Shipping</h5>
                </div>


                <div className="col-3 " style={{ paddingTop: "5px", borderTop: payment ? "3px solid #ff8000" : "3px solid gray" }}>
                    <div className="rounded-circle align-items-center d-flex justify-content-center"
                        style={{ height: "25px", width: "25px", background: payment ? "#ff8000" : "gray", marginTop: "-19px", marginLeft: "-13px" }}>


                        {payment ?
                            <i className="fa-sharp fa-regular fa-circle-check text-light " style={{ fontSize: "14px" }}></i> :
                            <i className="fa-regular fa-circle text-light" style={{ fontSize: "13px" }}></i>

                        }
                    </div>
                    <h5 style={{ marginLeft: "-27px", color: payment ? "#ff8000" : "gray" }}>Payment</h5>
                </div>

                <div className="col-3 " style={{ paddingTop: "5px", borderTop: placeOrder ? "3px solid #ff8000" : "3px solid gray" }}>
                    <div className="rounded-circle align-items-center d-flex justify-content-center"
                        style={{ height: "25px", width: "25px", background: placeOrder ? "#ff8000" : "gray", marginTop: "-19px", marginLeft: "-13px" }}>


                        {placeOrder ?
                            <i className="fa-sharp fa-regular fa-circle-check text-light " style={{ fontSize: "14px" }}></i> :
                            <i className="fa-regular fa-circle text-light" style={{ fontSize: "13px" }}></i>

                        }
                    </div>
                    <h5 style={{ marginLeft: "-27px", color: placeOrder ? "#ff8000" : "gray" }}>Place Order</h5>
                </div>
            </div>
        </>
    )
}