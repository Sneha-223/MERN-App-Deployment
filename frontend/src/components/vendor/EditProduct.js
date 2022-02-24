import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Edit = (props) => {

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

    let path = window.location.pathname;
    let prod_id = path.substring(6);

    console.log("ID = ", prod_id);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("");
    const [type, setType] = useState("");
    const [shop, setShop] = useState(user.name);
    console.log(user.name);

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

    const onSubmit = (event) => {
        event.preventDefault();

        const newProduct = {
            name: name,
            price: price,
            rating: rating,
            type: type,
        };

        console.log(name, ",", price, ",", rating, ",", type,",",shop);

        axios
            .post("/api/product/edit/" + prod_id, newProduct)
            .then((response) => {
                alert("Edited\t" + response.data);
                console.log(response.data);
                //console.log('/api/user/edit' + userID)
                console.log("here");
            });

    };

    return (
        <Grid container align={"center"} spacing={2}>

            <Grid item xs={12}>
                <h2>EDIT PRODUCT</h2>
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


            <Grid item xs={12}>
                <Button variant="contained" onClick={onSubmit}>
                    Submit
                </Button>
            </Grid>
        </Grid>

    );
};

export default Edit;
