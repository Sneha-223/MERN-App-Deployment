import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

import { useNavigate } from "react-router-dom";

const Orders = (props) => {

    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    let stat = "";

    useEffect(() => {
        axios
            .get("/api/order")
            .then((response) => {
                setOrders(response.data);
                //setSortedorders(response.data);
                //setSearchText("");
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const nextStage = (event) => {

        if (event.status == "Ready For Pickup") {
            stat = "Completed"
        };

        const newOrder = {
            status: stat,
        }
        console.log(newOrder.status);
        console.log(event);
        axios
            .post("/api/order/status/" + event._id, newOrder)
            .then((response) => {
                alert("Edited\t" + response.data);
                console.log(response.data);
            });
    };

    return (
        
        <div>

            <Grid container align={"center"} spacing={2}>

                <Grid item xs={12}>
                    <h2>MY ORDERS</h2>
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
                                    <TableCell>Date</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Shop</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order, ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>{ind}</TableCell>
                                        <TableCell>{order.date}</TableCell>
                                        <TableCell>{order.itemName}</TableCell>
                                        <TableCell>{order.cost}</TableCell>
                                        <TableCell>{order.quantity}</TableCell>
                                        <TableCell>{order.shop}</TableCell>
                                        <TableCell>{order.status}</TableCell>
                                        {order.status=="Ready For Pickup" && <TableCell><a href="#" onClick={() => { nextStage(order) }}>Next stage</a></TableCell>}
                                        
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

export default Orders;