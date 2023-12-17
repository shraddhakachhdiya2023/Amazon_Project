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

            const item = result.data.products

            for (let i = 0; i < item.length; i++) {
                item[i].category = item[i].category?.name
            }

            if (result.status === 200) {
                setProducts(item)
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const FilterProduct = products.filter((x) => {
      
        return x.category?.toLowerCase().includes(Search?.value?.toLowerCase())
    })

//    console.log(products)
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

                            return <ProductCard product={x} key={x._id} />
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