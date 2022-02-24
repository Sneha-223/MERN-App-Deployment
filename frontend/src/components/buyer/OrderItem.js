import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Orders() {

  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState("");

  const onChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };


  let path = window.location.pathname;
  let productId = path.substring(8);

  const [product, setProduct] = useState("");

  let userID = localStorage.getItem("USER_ID");
  const [user, setUser] = useState("");

  useEffect(() => {

    userID = localStorage.getItem("USER_ID")

    axios.get('/api/user/' + userID)
      .then(response => {
        console.log(response.data)
        setUser(response.data)
      })
      .catch(error => {
        console.log(error.response.data)
        localStorage.setItem('USER_ID', 0)
      })

    axios.get('/api/product/' + productId)
      .then(response => {
        console.log(response.data)

        setProduct(response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
  }, [])

  const onSubmiting = (event) => {
    event.preventDefault();

    setAmount(parseInt(quantity) * parseInt(product.price))

  }

  const onSubmit = (event) => {
    event.preventDefault();

    const newProduct = {
      date: Date.now(),
      cost: product.price,
      rating: product.rating,
      itemName: product.name,
      quantity: quantity,
      shop: product.shop,
      status: "Placed",
      buyer: user.email,
    };

    const newUser = {
      wallet: parseInt(user.wallet) - (parseInt(quantity) * parseInt(product.price)),
    }

    axios
      .post("/api/user/wallet/" + userID, newUser)
      .then((response) => {
        alert("Edited\t" + response.data);
        console.log(response.data);
      });

    console.log(newUser.wallet);

    axios
      .post("/api/order/orders", newProduct)
      .then((response) => {
        alert("Created\t" + response.data.itemName);
        console.log(response.data);
      });
  }

  return (

    <Grid container align={"center"} spacing={2}>

      <Grid item xs={12}>
        <h2>ORDER DETAILS</h2>
      </Grid>

      <Grid item xs={12}>
        Item Name: {product.name}
      </Grid>
      <Grid item xs={12}>
        Shop: {product.shop}
      </Grid>
      <Grid item xs={12}>
        Price: {product.price}
      </Grid>
      <Grid item xs={12}>
        Rating: {product.rating}
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Enter quantity"
          variant="outlined"
          value={quantity}
          onChange={onChangeQuantity}
        />
      </Grid>

      {<Grid item xs={12}>
        <Button variant="contained" onClick={onSubmiting}>
          Add quantity
        </Button>
      </Grid>
      }

      {
        amount > user.wallet &&
        <Grid item xs={12}>
          Not enough balance! 
        </Grid>
      }

{
  amount <= user.wallet &&
    <Grid item xs={12}>
      <Button variant="contained" onClick={onSubmit}>
        Order
      </Button>
    </Grid>
}

    </Grid >

  )
}
export default Orders