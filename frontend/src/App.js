import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import LoginPage from "./components/users/App";
import CustomerPage from "./components/buyer/App";
import VendorPage from "./components/vendor/App";

function App() {
  const [ID, setID] = useState("0");
  const [type, setType] = useState("0")
  
  useEffect(() => {

    // Update the document title using the browser API
    let a = localStorage.getItem('USER_ID')
    console.log("a:", a)
    if (!a || a == 0 || a == "") { setID("0"); localStorage.setItem('USER_ID', ''); }
    else {
      setID(a)
      axios.get('/api/user/' + a)
        .then(response => {
          setType(response.data.type)
          if (response.data == "") { setID("0"); localStorage.setItem('USER_ID', ''); }
          console.log(setID);
        })
    }
  }, []);
  if (ID == "0") {
    return (
      <LoginPage setID={setID} />
    );
  }
  else {
    // find the type of the user

    if (type == "Buyer")
    {
      return (
        <CustomerPage setID={setID} />
      )
    }
    else if (type == "Vendor")
      return (
        <VendorPage setID={setID} />
      )
    else {
      return (
        <LoginPage setID={setID} />
      );
    }
  }

}


export default App;
