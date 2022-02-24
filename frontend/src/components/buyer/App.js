import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import Home from "./Home";
import Navbar from "./Navbar";
import Profile from "../users/Profile";
import Logout from "../common/Logout";
import Edit from "../users/Edit";
// import ProductsList from "../products/ProductsList";
import Products from "./Product";
import OrderItem from "./OrderItem";
import Orders from "./Orders";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="edit" element={<Edit />} />
          {/* <Route path="products/add" element={<Products />} /> */}
          <Route path="/products" element={<Products />} />
          <Route path="/orders/:id" element={<OrderItem />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;