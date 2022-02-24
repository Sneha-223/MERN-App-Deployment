import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import Home from "./Home";
import Navbar from "./Navbar";
import Profile from "../users/Profile";
import Logout from "../common/Logout";
import Edit from "../users/Edit";
import Dashboard from "./ProductsList";
import Products from "./Products";
import EditProducts from "./EditProduct";
import Orders from "./Orders";
import Statistics from "./Stats";

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
          <Route path="/edit" element={<Edit />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="products/add" element={<Products />} />
          <Route path="products" element={<Dashboard />} />
          <Route path="edit/:id" element={<EditProducts />} />
          <Route path="orders" element={<Orders />} />
          <Route path="statistics" element={<Statistics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
