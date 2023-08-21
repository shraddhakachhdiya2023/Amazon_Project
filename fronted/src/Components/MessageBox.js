// import { useState } from "react"

export default function MessageBox(props) {

    const {error, seterror}= props
    return (
        <>
            {/* 
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button> */}

            <div className={error ? "d-block" : "d-none"}>

                <div className={`modal fade ${error ? "show" : ''}`} style={{ display: error ? "block" : "",zIndex:"10000",height:"250px"}} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog " >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {error}
                            </div>
                            <div className="modal-footer">
                                <button  onClick={()=>seterror("")} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div onClick={()=>seterror("")} style={{position:"fixed",transition:"all .5s linear",top
            :0,left:"0",background:"#78767678 ",zIndex:"1000",minHeight:"100vh",minWidth:"100%"}}></div>
            </div >
          
        </>
    )
}