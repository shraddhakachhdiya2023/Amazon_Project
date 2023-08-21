import { useState } from "react";
import { useEffect } from "react";
import ProductCard from "../Components/ProductCard";
import apiHelper from "../common/ApiHelper";
import Loader from "../Components/Loader";
import MessageBox from "../Components/MessageBox";
// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import products from "../Components/data";


const Home = (props) => {
    let { Search } = props
    const [products, setProducts] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState("")


    const FetchProducts = async () => {
        try {
            setisLoading(true)
            const result = await apiHelper.fetchProduct()


            if (result.status === 200) {
                setProducts(result.data.products)
                setisLoading(false)
            }
        } catch (error) {

            setisLoading(false)
            if (error.response && error.response.data.message) {

                return setError(error.response.data.message)
            }
            setError(error.message)
        }
    }

    useEffect(() => {

        FetchProducts()
        return () => {

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const FilterProduct = products.filter((x) => {
        return x.category.toLowerCase().includes(Search?.value?.toLowerCase())
    })



    // const responsive = {
    //     superLargeDesktop: {
    //         // the naming can be any, depends on you.
    //         breakpoint: { max: 4000, min: 3000 },
    //         items: 5
    //     },
    //     desktop: {
    //         breakpoint: { max: 3000, min: 1024 },
    //         items: 3
    //     },
    //     tablet: {
    //         breakpoint: { max: 1024, min: 464 },
    //         items: 2
    //     },
    //     mobile: {
    //         breakpoint: { max: 464, min: 0 },
    //         items: 1
    //     }
    // };


    return (
        <>

            <div className="container" style={{ position: "relative" }}>
                <MessageBox error={error} seterror={setError} />
                <Loader isLoading={isLoading} />

                <h5 className="mt-4 mb-2 text-center">Feture Products.</h5>
                <div className="d-flex flex-wrap gap-3 justify-content-center">






                    {/* { products && products.map((x) => {
                        return <Carousel  responsive={responsive}>  <ProductCard key={x._id} product={x} />  </Carousel>
                    })} */}
                        {
                                Search.value === undefined ? products.map((x) => {
                                    return <ProductCard product={x}   key={x._id}/>
                                }) : (
                                    FilterProduct.length === 0 ? <span className="text-danger fs-5">This Items Not Found:<b>{Search.value}</b></span> :
                                        FilterProduct && FilterProduct.map((x) => {
                                            return <ProductCard product={x} />
                                        })
                                )
                            }


                </div>
            </div>
        </>
    )
}

export default Home