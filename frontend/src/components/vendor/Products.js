import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Products = (props) => {

  let userID = localStorage.getItem("USER_ID");
  const [user, setUser] = useState("")

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
  }, [])

  

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [type, setType] = useState("");
  const [shop, setShop] = useState("");
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const onChangeRating = (event) => {
    setRating(event.target.value);
  };

  const onChangeType = (event) => {
    setType(event.target.value);
  };

  // const onChangeTags = (event) => {
  //   setTags(event.target.value);
  // };

  const onSubmitTag = () => {
    setTags([...tags, `Entry${tags.length}`]);
  };


  const resetInputs = () => {
    setName("");
    setPrice("");
    setRating("");
    setType("Veg");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newProduct = {
      name: name,
      price: price,
      rating: rating,
      type: type,
      shop: user.name,
      tags: tags,
    };

    axios
      .post("/api/product/products", newProduct)
      .then((response) => {
        alert("Added\t" + response.data.name);
        console.log(response.data);
      });

    resetInputs();
  };

  return (
    <Grid container align={"center"} spacing={2}>

      <Grid item xs={12}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={onChangeName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Price"
          variant="outlined"
          value={price}
          onChange={onChangePrice}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Rating"
          variant="outlined"
          value={rating}
          onChange={onChangeRating}
        />
      </Grid>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Food-Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Food-Type"
          onChange={onChangeType}
        >
          <MenuItem value={"Veg"}>Veg</MenuItem>
          <MenuItem value={"Non-Veg"}>Non-Veg</MenuItem>

        </Select>
      </FormControl>

      <Grid item xs={12}>
        <TextField
          label="Enter tags"
          variant="outlined"
          value={tag}
          onChange={(event) => {
            setTag(event.target.value);
            console.log("tag: " + event.target.value);

          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" 
        onClick={() => {
          setTags([...tags, tag]);
          console.log("TAGS: " + tags);
        }}
        >
          Add Tag
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Add Product
        </Button>
      </Grid>
    </Grid>
  );
};

export default Products;
