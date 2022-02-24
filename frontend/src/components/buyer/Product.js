import { useState, useEffect } from "react";
import * as React from 'react';
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';


const ProductsList = (props) => {

  const [checked, setChecked] = React.useState(false);
  const [checkedVeg, setCheckedVeg] = React.useState(false);
  const [checkedNonVeg, setCheckedNonVeg] = React.useState(false);

  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [filterShop, setFilterShop] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [searchText, setSearchText] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [WantVeg, setWantVeg] = useState(false);
  const [WantNonVeg, setWantNonVeg] = useState(false);

  const [quantity, setQuantity] = useState("");

  const onChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

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

    axios
      .get("/api/product")
      .then((response) => {
        setProducts(response.data);
        setSortedProducts(response.data);
        setFilterShop(response.data);
        setSearchText("");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      wallet: parseInt(quantity) + parseInt(user.wallet),
    };

    console.log(newUser.wallet);

    axios
      .post("/api/user/wallet/" + userID, newUser)
      .then((response) => {
        alert("Edited\t" + response.data);
        console.log(response.data);
      });
  };

  const sortPrice = () => {
    let productsTemp = products;
    const flag = sortName;
    productsTemp.sort((a, b) => {
      if (a.price != undefined && b.price != undefined) {
        return (1 - flag * 2) * (new Number(a.price) - new Number(b.price));
      } else {
        return 1;
      }
    });
    setProducts(productsTemp);
    setSortName(!sortName);
  };

  const sortRating = () => {
    let productsTemp = products;
    const flag = sortName;
    productsTemp.sort((a, b) => {
      if (a.rating != undefined && b.rating != undefined) {
        return (1 - flag * 2) * (new Number(a.rating) - new Number(b.rating));
      } else {
        return 1;
      }
    });
    setProducts(productsTemp);
    setSortName(!sortName);
  };

  const handleChangeVeg = (event) => {
    setCheckedVeg(event.target.checked);

    setWantVeg(event.target.checked);
  };

  const handleChangeNonVeg = (event) => {
    setCheckedNonVeg(event.target.checked);

    setWantNonVeg(event.target.checked);

    //WantNonVeg = true;
  };


  let productsTemp = sortedProducts;
  const uniqueShops = [];
  productsTemp.map(product => {
    if (uniqueShops.indexOf(product.shop) === -1) {
      uniqueShops.push(product.shop)
    }
  });

  let shopstate = new Array(uniqueShops.length).fill(false);
  // const [checkedState, setCheckedState] = useState(
  //   new Array(uniqueShops.length).fill(false)
  // );


  //console.log("initial checkbox: " + shopstate);
  //let filteredShops = [];

  //console.log( "initial filtered shop: ", filteredShops);

  const handleOnChange = (position) => {
    let filteredShops = [];
    console.log( "inside filtered shop: ", filteredShops);
    //console.log("position ", position);

    if (shopstate[position] == false)
      shopstate[position] = true;
    else if (shopstate[position] == true)
      shopstate[position] = false;
    // const updatedCheckedState = shopstate.map((item, index) =>
    //   index === position ? !item : item
    // );

    //const updatedCheckedState = checkedState;

    //setCheckedState(updatedCheckedState);
    console.log("updated: " + shopstate);
    //console.log("checkbox: " + checkedState);
    //console.log("unique shops: " + uniqueShops);
    
    uniqueShops.forEach(function (shopName, index) {
      sortedProducts.forEach(function (product) {
        if(product.shop == shopName && shopstate[index]==true)
        {
          filteredShops.push(product);
        }
      });
    });

    console.log("FilteredShops: ", filteredShops);
    setProducts(filteredShops);

    // //let filteredShops = [];
    // productsTemp = products;

    // //console.log( "initial filtered shop: ", filteredShops);

    // uniqueShops.forEach(function (shopName, index) {

    //   filterShop.forEach(function (product) {

    //     if(product.shop == shopName && shopstate[index]==true)
    //     {
    //       filteredShops.push(product);
    //       console.log("index: ", shopstate[index]);
    //       console.log( "filtered shop: ", filteredShops);
    //     }
        
    //   });

    // });

    // setProducts(filteredShops);
    // console.log(filteredShops);
    // //setFilterShop(filteredShops);
    // //filterShop = filteredShops;
    // //console.log("shop products: ", products);

  };

  const handlePrices = (event) => {

    let tempProduct = [];
    //if(minPrice != "" && maxPrice != "")
    //{
    console.log("handle PRICE");
    productsTemp.forEach(function (product) {

      if (minPrice != "" && product.price >= parseInt(minPrice)) {
        if (maxPrice != "" && product.price <= parseInt(maxPrice)) {
          tempProduct.push(product);
          console.log("prod: " + product);
        }
      }
    });
    //}
    setProducts(tempProduct);
  };

  const fuse = new Fuse(sortedProducts, {
    keys: [
      'name'
    ],
    includeScore: true
  })



  useEffect(() => {
    var temp = [];

    let productsTemp = sortedProducts;

    // //NORMAL SEARCH
    // if(searchText!= "")
    // {
    //   temp = productsTemp.filter((val)=>{
    //     if(searchText == ""){
    //       return val;
    //     }
    //     else if(val.name.toLowerCase().includes(searchText.toLowerCase())){
    //       return val;
    //     }
    //   });
    // }

    if (searchText != "") {
      var results = [];

      if (searchText != "") {
        results = fuse.search(searchText);
        temp = results.map(result => result.item);
        //console.log('Results', dataResults);
        //setProducts(temp);
        productsTemp = temp;
      }
      else if (searchText == "") {
        temp = sortedProducts;
        productsTemp = temp;
        //setProducts(sortedProducts);
      }
      setProducts(temp);
    }

    //Veg and Non-Veg Filters
    let temp1 = [];

    if (WantVeg || WantNonVeg) {

      productsTemp.forEach(function (product) {

        if (WantVeg && product.type == "Veg") {
          temp1.push(product);
        }
        else if (WantNonVeg && product.type == "Non-Veg") {
          temp1.push(product);
        }

      });
      setProducts(temp1);
      productsTemp = temp1;
    }

    //Price
    temp = [];
    //const handlePrices = (event) => {
    console.log("MIN: ", minPrice);
    console.log("MAX: ", maxPrice);
    if (minPrice != "" || maxPrice != "") {
      console.log("PRICE");
      productsTemp.forEach(function (product) {

        if (minPrice != "" && product.price >= parseInt(minPrice)) {
          if (maxPrice != "" && product.price <= parseInt(maxPrice)) {
            temp.push(product);
            console.log("prod: " + product);
          }
        }
      });
      setProducts(temp);
    }
    //};

    // if(shopstate.some(shop => shop == true))  //if true value exists
    // {
    //   setProducts(filteredShops);
    // }

    //temp = temp.filter((item) => uniqueShops.length? uniqueShops.some((shop) => shop == item.shop) : true);console.log(temp);

    //temp = temp.filter((item) => selTags.length? selTags.some((vendor) => vendor == item.tags) : true);console.log(temp);

    //setProducts(temp);
    console.log("temp: " + temp);

    console.log("PROD: " + products);

  }, [searchText, WantVeg, WantNonVeg]);

  return (
    <div>

      <Grid container align={"Right"} spacing={2}>
        <Grid item xs={12}>
          Wallet amount = Rs.{user.wallet}
        </Grid>
        <Grid item xs={12} >
          <TextField
            label="Enter amount"
            variant="outlined"
            value={quantity}
            onChange={onChangeQuantity}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={onSubmit}>
            Add money
          </Button>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem text>
              <h1>Filters</h1>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <List component="nav" aria-label="mailbox folders">
            <TextField
              id="standard-basic"
              label="Search"
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            // onChange={customFunction}
            onChange={(event) => {
              setSearchText(event.target.value);
              console.log("search: " + event.target.value);

            }}
            />
          </List>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  Price
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Enter Min"
                    value={minPrice}
                    fullWidth={true}
                    onChange={(event) => {
                      setMinPrice(event.target.value);
                      console.log("min: " + minPrice);
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Enter Max"
                    value={maxPrice}
                    fullWidth={true}
                    onChange={(event) => {
                      setMaxPrice(event.target.value);
                      console.log("max: " + maxPrice);
                    }}
                  />
                </Grid>
                {/* <Button onClick={handlePrices}>
                  Filter Price
                </Button>  */}

              </Grid>
            </ListItem>
            <Divider />
            <ListItem divider>
              <Autocomplete
                id="combo-box-demo"
                options={products}
                getOptionLabel={(option) => option.name}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Names"
                    variant="outlined"
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <FormControlLabel
                  control={<Checkbox checked={checkedVeg} onChange={handleChangeVeg} />}
                  label="Veg"
                />
                <FormControlLabel
                  control={<Checkbox checked={checkedNonVeg} onChange={handleChangeNonVeg} />}
                  label="Non-Veg"
                />
            </ListItem>
            
            <ListItem>
              {uniqueShops.map(({ name }, index) => {
                return (

                  <li key={index}>
                    <div className="shop-list-item">
                      <div className="left-section">
                        <input
                          type="checkbox"
                          id={`custom-checkbox-${index}`}
                          name={uniqueShops[index]}
                          //name= {name}
                          value={uniqueShops[index]}
                          checked={shopstate[index]}
                          onChange={() => handleOnChange(index)}
                        />
                        <label htmlFor={`custom-checkbox-${index}`}>{uniqueShops[index]}</label>
                        {/* {uniqueShops[1]} */}
                      </div>

                      {/* <div className="right-section">{getFormattedPrice(price)}</div> */}
                    </div>
                  </li>
                );
              })}
            </ListItem>

          </List>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell> Sr No.</TableCell>
                  <TableCell>Name</TableCell>

                  <TableCell>
                    {" "}
                    <Button onClick={sortPrice}>
                      {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    </Button>
                    Price
                  </TableCell>

                  <TableCell>
                    {" "}
                    <Button onClick={sortRating}>
                      {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    </Button>
                    Rating
                  </TableCell>

                  <TableCell>Shop Name</TableCell>
                  {/* <TableCell>Tags</TableCell> */}
                  <TableCell>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{ind}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.rating}</TableCell>
                    <TableCell>{product.shop}</TableCell>
                    {/* <TableCell>{product.tags}</TableCell> */}
                    <TableCell>{product.type}</TableCell>
                    <TableCell> <Link to={"/orders/" + product._id}>Buy</Link></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductsList;