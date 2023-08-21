import Footer from "./Components/Footer";
import "./App.css";

import Header from "./Components/Header";
import Home from "./Screens/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductScreen from "./Screens/ProductScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import CartScreen from "./Screens/CartScreen";
import { useState } from "react";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrder from "./Screens/PlaceOrder";

function App() {
  const [cartItems, setCartItems] = useState([])
  const [token, setToken] = useState()
  const [userInfo, setuserInfo] = useState()
  const [Search, setSearch] = useState("")

 

  return (
    <BrowserRouter>
      <div>
        {/* <a href="./public.zip">Download Code</a> */}
        <Header token={token} setToken={setToken} userInfo={userInfo} setuserInfo={setuserInfo} cartItems={cartItems} setCartItems={setCartItems} Search={Search} setSearch={setSearch} />
        <main className="p-2" style={{ minHeight: "89.9vh" }}>
          <Routes>
            <Route path="/" element={<Home Search={Search} />} />
            <Route path="/product/:id" element={<ProductScreen cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/login" element={<LoginScreen setuserInfo={setuserInfo} setToken={setToken} />} />
            <Route path="/register" element={<RegisterScreen setuserInfo={setuserInfo} setToken={setToken} />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/cart" element={<CartScreen cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrder cartItems={cartItems} setCartItems={setCartItems} />} />
            {/* <Route path="/order" element={}/> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
