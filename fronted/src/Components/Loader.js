export default function Loader(props) {
    const { isLoading } = props
    if (isLoading) {

    return (
        <div className="d-flex justify-content-center align-items-center" style={{
            width: "100%", height: "100vh", zIndex: "1000", background: "#fff",
            position: "fixed", left: "0", top: "0"
        }}>
            <i className="fa-solid fa-circle-notch text-warning fa-spin" style={{ fontSize: "4rem" }}></i>
            <br/>
            <br/>
            <br/>
           
            <h5>Loading...</h5>

           
        </div>


    )
    }
}
