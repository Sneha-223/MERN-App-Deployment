import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./UsersList";
import Home from "../common/Home";
import Register from "../common/Register";
import Navbar from "../templates/Navbar";
import Login from "../common/Login";
import Edit from "./Edit";

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
          <Route path="/" element={<Home />} />
          <Route path="users" element={<UsersList />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="edit" element={<Edit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
