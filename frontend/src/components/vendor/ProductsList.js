import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const ProductsList = (props) => {

    let userID = localStorage.getItem("USER_ID");
    const [user, setUser] = useState("");

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

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

    }, []);

    axios
        .get("/api/product/shop/" + user.name)
        .then((response) => {
            setProducts(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

    const onSubmit = () => {
        navigate("/products/add");
    }

    const deleteProduct = (id) => {
        axios.delete('/api/product/' + id)
            .then(response => { console.log(response.data) });

    }

    return (

        <div>

            <Grid container align={"center"} spacing={2}>

                <Grid item xs={12}>
                    <h2>DASHBOARD</h2>
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" onClick={onSubmit}>
                        Add Product
                    </Button>
                </Grid>
            </Grid>

            <Grid container>

                <Grid item xs={12}>

                </Grid>

                <Grid item xs={12} md={9} lg={9}>
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Sr No.</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Rating</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Shop</TableCell>
                                    <TableCell>Tags</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((product, ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>{ind}</TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.price}</TableCell>
                                        <TableCell>{product.rating}</TableCell>
                                        <TableCell>{product.type}</TableCell>
                                        <TableCell>{product.shop}</TableCell>
                                        {/* <TableCell>{product.tags}</TableCell>  */}
                                        {console.log("list tags: ", product.tags)}
                                        <div>{product.tags.map(entry =>
                                            <div>{entry}</div>
                                            )}
                                            </div>
                                        <TableCell><Link to={"/edit/" + product._id}>edit</Link> | <a href="#" onClick={() => { deleteProduct(product._id) }}>delete</a></TableCell>
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
