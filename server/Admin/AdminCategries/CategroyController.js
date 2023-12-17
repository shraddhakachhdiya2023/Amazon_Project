import CategroyModal from "./CategroyModal.js"

class CategroyController {

    async addCategroy(req, res) {
        try {
            const { name, alias } = req.body
            if (!name) {
                return res.status(400).send({ message: "Missing dependency name" })
            }

            if (!alias) {
                return res.status(400).send({ message: "Missing dependency alias" })
            }

            const result = await CategroyModal.create(req.body)
          
            if (result) {

                return res.status(200).send({ message: "success", categroy: result })
            }
            return res.status(500).send({ message: "Somthing went wrong" })

        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server Error" })
        }
    }

    async getCategroy(req, res) {      //product data client side show for data grid
        try {
            let result = await CategroyModal.find({})
        
            if (result) {
                return res.status(200).send({ message: "Success", categroy: result })
            }

            return res.status(400).send({ message: "Something went wrong" });

        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal server error" });
        }
    }

    async updateCategroy(req, res) {
        try {
            const id = req.params.id
            // console.log(id)
            const body = req.body
            // console.log(body)
            const result = await CategroyModal.updateOne({ _id: id }, body)
            if (result.modifiedCount > 0 || result.matchedCount > 0) return res.status(200).send({ message: "Success" })

            return res.status(400).send({ message: "Somthing went wrong" })

        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server error" })
        }
    }

    async removeCategroy(req, res) {
        try {
            const categoryId = req.params.id;
            
            const result = await CategroyModal.deleteOne({ _id: categoryId })
           
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
}

const categroyController = new CategroyController()
export default categroyController