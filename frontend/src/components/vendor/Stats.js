import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";

import { useNavigate } from "react-router-dom";

const Orders = (props) => {

    const navigate = useNavigate();
    let userID = localStorage.getItem("USER_ID");
    const [user, setUser] = useState("");
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    let stat = "";

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
        .get("/api/order/shop/" + user.name)
        .then((response) => {
            setOrders(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

    axios
        .get("/api/product/shop/" + user.name)
        .then((response) => {
            setProducts(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

    let k1 = 0, k2 = 0, k3 = 0, i = 0;
    let a = [0, 0, 0, 0, 0, 0];

    products.forEach(function (product) {

        orders.filter(order => order.itemName == product.name).map(filteredorder => (
            a[i]++
        ))
    });

    orders.forEach(function (order) {

        k1 = k1 + 1;

        if (order.status == "Completed") {
            k3 = k3 + 1;
        }
        else if (order.status == "Accepted" || order.status == "Placed" || order.status == "Cooking" || order.status == "Ready For Pickup") {
            k2 = k2 + 1;
        }
    });

    return (

        <div>

            <Grid container align={"center"} spacing={2}>

                <Grid item xs={12}>
                    <h2>STATISTICS</h2>
                </Grid>
            </Grid>

            <Grid container>

            <Grid item xs={12}>
                    {a[0]},{a[1]},{a[2]},{a[3]},{a[4]},{a[5]}
                </Grid>

                <Grid item xs={12}>
                    <h3>Orders Placed:</h3>{k1}
                </Grid>

                <Grid item xs={12}>
                    <h3>Pending Orders:</h3>{k2}
                </Grid>

                <Grid item xs={12}>
                    <h3>Completed Orders:</h3>{k3}
                </Grid>

            </Grid>
        </div>
    );
};

export default Orders;