import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./Components/Pages/Home/Home";
import LoginSignup from "./Components/Pages/LoginSignup/LoginSignup";
import Cart from "./Components/Pages/Cart/Cart";
import Products from "./Components/Pages/Products/Products";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signUp" element={<LoginSignup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
