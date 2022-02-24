var express = require("express");
var router = express.Router();

// Load User model
const Order = require("../models/Orders");

router.get("/", function (req, res) {
    Order.find(function (err, order) {
        if (err) {
            console.log(err);
        } else {
            res.json(order);
        }
    })
});

//Add order

router.post("/orders", (req, res) => {
    const newOrder = new Order({
        date: req.body.date,
        cost: req.body.cost,
        rating: req.body.rating,
        itemName: req.body.itemName,
        quantity: req.body.quantity,
        shop: req.body.shop,
        status: req.body.status,
        buyer: req.body.buyer,
    });

    newOrder.save()
        .then(order => {
            res.status(200).json(order);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post('/status/:id', (req, res) => {

    Order.findById(req.params.id, function (err, user) {
        if (!user)
            return next(new Error('Could not find that order!'));
        else {
            user.status = req.body.status;

            user.save()
                .then(emp => {
                    res.json('Updated Order');
                })
                .catch(err => {
                    res.status(400).send("Order To Update user");
                });
        }
    });
});

router.get("/shop/:shop", (req, res) => {
    let id = req.params.shop;
    Order.find({"shop": id}, function (err, product) {
        if (err) {
            res.json("");
        } else {
            res.json(product);
        }
    })
});

module.exports = router;