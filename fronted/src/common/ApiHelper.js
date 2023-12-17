import axios from "axios"

class ApiHelper {


    constructor() {
        this.baseurl = 'http://localhost:5000'
        // this.baseurl = 'http://192.168.173.252:5000'
        this.token = JSON.parse(localStorage.getItem("token"))
    }

    // fetchProduct() {
    //     return axios.get(this.baseurl + '/product')
    // }
    fetchProduct() {
        return axios.get(this.baseurl + '/admin/getproduct')
    }
    // fetchProductById(id) {
    //     return axios.get(this.baseurl + '/product/' + id)
    // }
    fetchProductById(id) {
        return axios.get(this.baseurl + '/admin/editproduct/' + id)
    }

    userLogin(data) {
        return axios.post(this.baseurl + "/user/login", data)
    }
    RegisterUser(data) {
        return axios.post(this.baseurl + "/user/register", data)
    }

    fetchCart(products) {
        return axios.post(`${this.baseurl}/cart`, { products: products })
    }

    placeOrder(order) {
        this.token = JSON.parse(localStorage.getItem("token"))
        return axios.post(`${this.baseurl}/orderauth`, order, { headers: { token: this.token } })
    }

    paymentVerify(details) {
        this.token = JSON.parse(localStorage.getItem("token"))
        return axios.post(`${this.baseurl}/payment/verify`, details, { headers: { token: this.token } })
    }

}

const apiHelper = new ApiHelper()
export default apiHelper