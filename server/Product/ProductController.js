import productModal from "./ProductModal.js"

// const products = [
//   {
//     // _id: '1',
//     name: 'Slim Shirt',
//     category: 'Shirts',
//     image: '/images/d1.jpg',
//     price: 60,
//     alias: 'slim_shirt',
//     brand: ' Nike',
//     rating: 4.5,
//     numReviews: 10,
//     countInStock: 15,

//   },

//   {
//     // _id: '2',
//     name: 'Fit Shirt',
//     category: 'Shirts',
//     image: '/images/d2.jpg',
//     alias: 'west',
//     price: 50,
//     brand: ' Nike',
//     rating: 3.2,
//     numReviews: 5,
//     countInStock: 20,

//   },
//   {
//     // _id: '3',
//     name: 'Best Pants',
//     category: 'Pants',
//     image: '/images/d3.jpg',
//     alias: 'Best_Pants',
//     price: 70,
//     brand: ' Nike',
//     rating: 2.5,
//     numReviews: 8,
//     countInStock: 5,

//   }, {
//     // _id: '4',
//     name: 'West Pants',
//     category: 'Pants',
//     image: '/images/p1.jpg',
//     alias: 'Fit_shirt',
//     price: 70,
//     brand: ' Nike',
//     rating: 4.5,
//     numReviews: 8,
//     countInStock: 15,

//   },
//   {
//     name: 'Sharleez Womens Solid Bodycon Western Mini Dress for Women/Girls',
//     category: 'Dress',
//     image: '/images/g2.jpg',
//     image1: '/images/g2.jpg',
//     image2: '/images/g1.jpg',
//     image3: '/images/g3.jpg',
//     image4: '/images/g4.jpg',
//     price: 699,
//     brand: ' Regular',
//     rating: 5,
//     numReviews: 30,
//     countInStock: 10,
//     alias: "Solid_Dress"
//   },
//   {
//     name: 'YOYOWING PU Synthetic Leather Womens Satchel Bag | Ladies Purse Handbag',
//     category: 'Bag',
//     image: '/images/b1.jpg',
//     image1: '/images/b2.jpg',
//     image2: '/images/b1.jpg',
//     image3: '/images/b3.jpg',
//     image4: '/images/b4.jpg',
//     price: 594,
//     brand: ' Leather',
//     rating: 3.2,
//     numReviews: 5,
//     countInStock: 5,
//     alias: "Solid_Bag"
//   },
//   {
//     name: 'Bizanne Fashion Cute Front Bow Backpack for Women and Fashion Backpack for Girls, College Bag for Women',
//     category: 'Bag',
//     image: '/images/sb1.jpg',
//     image1: '/images/sb2.jpg',
//     image2: '/images/sb1.jpg',
//     image3: '/images/sb3.jpg',
//     image4: '/images/sb4.jpg',
//     price: 400,
//     brand: ' Zipper',
//     rating: 3,
//     numReviews: 5,
//     countInStock: 35,
//     alias: "Cute_Bag"
//   },
//   {
//     name: 'DAHSHA Stylish One Side Shoulder Sling Bag with Mullti-Pocket Zip Closure for Girls and Women - Grey',
//     category: 'Bag',
//     image: '/images/sp1.jpg',
//     image1: '/images/sp1.jpg',
//     image2: '/images/sp2.jpg',
//     image3: '/images/sp3.jpg',
//     image4: '/images/sp4.jpg',
//     price: 500,
//     brand: ' Zipper',
//     rating: 4,
//     numReviews: 5,
//     countInStock: 30,
//     alias: "Side_Bag"
//   },
//   {
//     name: 'Sharleez Womens Solid Bodycon Western Mini Dress for Women',
//     category: 'Dress',
//     image: '/images/bg2.jpg',
//     image1: '/images/bg2.jpg',
//     image2: '/images/bg1.jpg',
//     image3: '/images/bg3.jpg',
//     image4: '/images/bg4.jpg',
//     price: 1099,
//     brand: ' Regular',
//     rating: 5,
//     numReviews: 30,
//     countInStock: 20,
//     alias: "Solid_Dress"
//   },
// ]




class ProductController {

  async getProducts(req, res) {
    try {
      const result = await productModal.find()
      if (result) return res.status(200).send({ message: 'sucess', products: result })
      return res.status(500).send({ message: 'Something went wrong' })

    } catch (error) {
      // console.log(error);
      return res.status(500).send({ message: "internal server error" })


    }
    // res.setHeader("Access-Control-Allow-Origin", "*")
    // return res.status(200).send({ message: "Success", products: products })
  }




  // async insertMany(req, res) {
  // //  console.log(req);
  //   try {
  //     const result = await productModal.insertMany(products)

  //     // console.log(ressult);

  //     if (result) {
  //       return res.status(200).send({ message: "sucess", products: result })
  //     }
  //     return res.status(500).send({ message: "Something went wrong" })
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).send({ message: "internal server error" })

  //   }
  // }



  // getProductByID(req, res) {
  //   const { id } = req.params

  //   if (!id) {
  //     return res.status(400).send({ message: 'Bad Request' })
  //   }

  //   const product = products.find((product) => product._id === id)

  //   if (!product) {
  //     return res.status(200).send({ message: 'Not Found', product: product || {} })
  //   }
  //   return res.status(200).send({ message: 'success', product: product || {} })


  // }

  async getProductByID(req, res) {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(400).send({ message: "Bad request" })
      }
      const result = await productModal.findById({ _id: id })
      if (result) {
        return res.status(200).send({ message: "sucess", Product: result })

      }
      return res.status(500).send({ message: 'something went wrong' })

    } catch (error) {
      return res.status(500).send({ message: "internal server error" })
    }
  }

 





}



const productController = new ProductController()
export default productController