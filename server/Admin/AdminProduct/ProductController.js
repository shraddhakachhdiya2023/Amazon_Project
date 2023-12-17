import productModal from "../../Product/ProductModal.js"

class ProductController {


    async adminproduct(req, res) {   //product databasse ma add
        try {
            const { name, brand, alias, category, description, price, discount, countInStock, image, RelevantImages, totalPrice } = req.body

            if (!name || !brand || !alias || !category || !description || !price || !discount || !countInStock || !image || !RelevantImages || !totalPrice) {
                return res.status(400).send({ message: "Missing dependency products" })
            }

            const result = await productModal.create(req.body)

            if (result) {

                return res.status(200).send({ message: "success", products: result })
            }
            return res.status(500).send({ message: "Somthing went wrong" })

        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "internal server error" })

        }
    }



    async GetAdminProducts(req, res) {      //product data client side show for data grid
        try {
            let result = await productModal.find({}).populate("image").populate({ path: "category" })


            if (result) {
                // Assuming result is an array of products
                result = result.map(product => {

                    if (product.image) {
                        // Assuming result.image is an object or reference to the image
                        const imageUrl = "http://localhost:5000" + product.image.path;
                        // Return a modified product object with the image URL
                        return {
                            ...product._doc,
                            image: {
                                ...product.image._doc,
                                url: imageUrl
                            }
                        };
                    }
                    return product._doc;
                });

                return res.status(200).send({ message: "Success", products: result });
            }

            return res.status(400).send({ message: "Something went wrong" });

        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal server error" });
        }
    }




    async removeProduct(req, res) {
        try {
            const productId = req.params.id;



            const result = await productModal.deleteOne({ _id: productId })

            if (result) {
                return res.status(200).send({ message: "Success" });
            } else {
                return res.status(404).send({ message: "Somthing went wrong" });
            }
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal Server error" })
        }
    }

    async getAdminProductByID(req, res) {   //product ni id  find through product edit 
        try {
            const { id } = req.params
            // console.log(id)
            if (!id) {
                return res.status(400).send({ message: "Bad request" })
            }
            let result = await productModal.findById({ _id: id }).populate({ path: "image" }).populate({ path: "category" })
            if (result) {
                result = result._doc
                result.image = result.image._doc
                result.image.url = "http://localhost:5000" + result.image.path

                return res.status(200).send({ message: "sucess", Product: result })
            }
            return res.status(500).send({ message: 'something went wrong' })

        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "internal server error" })
        }
    }

    async updateProduct(req, res) {
        try {
            const id = req.params.id

            const body = req.body

            const result = await productModal.updateOne({ _id: id }, body)

            if (result.modifiedCount > 0 || result.matchedCount > 0) return res.status(200).send({ message: "Success" })

            return res.status(400).send({ message: "Somthing went wrong" })

        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server error" })
        }
    }

    async Getcart(req, res) {
        try {
            const { products } = req.body
         
            if (!products) {
                return res.status(400).send({ message: "Missing dependency products" })
            }
            let result = await productModal.find({ _id: products }).select(["name", "price", "_id", "category", "brand", "countInStock", "image"]).populate("image")
            
            if (result) {
                // Assuming result is an array of products
                result = result.map(product => {

                    if (product.image) {
                        // Assuming result.image is an object or reference to the image
                        const imageUrl = "http://localhost:5000" + product.image.path;
                        // Return a modified product object with the image URL
                        return {
                            ...product._doc,
                            image: {
                                ...product.image._doc,
                                url: imageUrl
                            }
                        };
                    }
                    return product._doc;
                });
                console.log(result)

                return res.status(200).send({ message: "Success", products: result });
            }
            
            if (!result) {
                return res.status(500).send({ message: "Somthing went wrong" })
            }
            // return res.status(200).send({ message: "sucess", products: result })


        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "internal server error" })

        }
    }

}

const AdminProductController = new ProductController()
export default AdminProductController