import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const AddOn = (props) => {

  let productID = localStorage.getItem("PRODUCT_ID")
  const [product, setProduct] = useState("")

  useEffect(() => {

    axios.get('/api/product/' + productID)
      .then(response => {
        console.log(response.data)
        setProduct(response.data)
      })
      .catch(error => {
        console.log(error.response.data)
        localStorage.setItem('PRODUCT_ID', 0)
      })
  }, [])

  const [addOn, setAddOn] = useState(product.addOn);

  const onChangeAddOn = (event) => {
    setAddOn(event.target.value);
  };

  
  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      addOn: addOn,
    };

    axios
      .post("/api/user/edit/"+ userID, newUser)
      .then((response) => {
        alert("Edited\t" + response.data);
        console.log(response.data);
        //console.log('/api/user/edit' + userID)
        //console.log("here");
      });
  };

  return (
    <Grid container align={"center"} spacing={2}>

      <Grid item xs={12}>
        <h2>ADD ONS</h2>
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Name"
          variant="outlined"
          value={addOn.item.name}
          //onChange={onChangeEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Price"
          variant="outlined"
          value={addOn.item.price}
          //onChange={onChangePassword}
        />
      </Grid>
      
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Submit Changes
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddOn;