import productmodal from "./ProductModal.js"



const products = [
  {
    name: 'Slim Shirt',
    category: 'Shirts',
    image: '/images/d1.jpg',
    price: 60,
    brand: ' Nike',
    rating: 4.5,
    numReviews: 10,
    alias:
  },
  {
    name: 'Fit Shirt',
    category: 'Shirts',
    image: '/images/d2.jpg',
    price: 50,
    brand: ' Nike',
    rating: 3.2,
    numReviews: 5
  },
  {
    name: 'Best Pants',
    category: 'Pants',
    image: '/images/d3.jpg',
    price: 70,
    brand: ' Nike',
    rating: 2.5,
    numReviews: 8
  }, {
    name: 'Best Pants',
    category: 'Pants',
    image: '/images/p1.jpg',
    price: 70,
    brand: ' Nike',
    rating: 4.5,
    numReviews: 8
  },
]




class ProductController {

  async insertProducts(req,res) {
    try {
      const result = await productmodal.insertMany(products)
      if (result) {
        return res.status(200).send({ message: "Sucess", result: result })
      }
      return res.status(500).send({ message: "Something went wrong", result: result })

    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'internal server error' })

    }
  }



  async getProduct(req, res) {

    try {
      const result=await productmodal.find({})
          if(result){
            return res.status(200).send({message:"sucess", Product:result})
          }
          return res.status(500).send({message:"Something went wrong"})
    } catch (error) {
      console.log(error);
      return res.status(500).send({message:"internal server error"})
      
    }

    // return res.status(200).send({ message: "Success", products: products })
  }
  getProductByID(req, res) {
    const { id } = req.params

    if (!id) {
      return res.status(400).send({ message: 'Bad Request' })
    }

    const product = products.find((product) => product._id === id)

    if (!product) {
      return res.status(200).send({ message: 'Not Found', product: product || {} })
    }
    return res.status(200).send({ message: 'success', product: product || {} })


  }

  async getProductByID(req,res){
    try {
      const {id} = req.params
      if(!id){
        return res.status(400).send({message:"Bad request"})
      }
      const result=await productmodal.findById({_id:id})
      if(result){
        return res.status(200).send({ message: "sucess", Product:result})

      }
      return res.status(500).send({ message: 'something went wrong'})
 
    } catch(error)  {
      return res.status(500).send({message:"internal server error"})
    }
  }
}

const productController = new ProductController()
export default productController