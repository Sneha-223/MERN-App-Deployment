var express = require("express");
var router = express.Router();

// Load User model
const Product = require("../models/Products");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    Product.find(function (err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    })
});

// POST request 
// Add a product to db
router.post("/products", (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        rating: req.body.rating,
        type: req.body.type,
        shop: req.body.shop,
        tags: req.body.tags,
    });

    newProduct.save()
        .then(product => {
            res.status(200).json(product);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post('/wallet/:id', (req, res) => {

    Product.findById(req.params.id, function (err, user) {
        if (!user)
            return next(new Error('Could not find product!'));
        else {
            user.wallet = req.body.wallet;

            user.save()
                .then(emp => {
                    res.json('Updated product');
                })
                .catch(err => {
                    res.status(400).send("Could not update user");
                });
        }
    });
});

router.post('/edit/:id', (req, res) => {

    Product.findById(req.params.id, function (err, user) {
        if (!user)
            return next(new Error('Could not find product!'));
        else {
            user.name = req.body.name;
            user.price = req.body.price;
            user.rating = req.body.rating;
            user.type = req.body.type;

            user.save()
                .then(emp => {
                    res.json('Updated product');
                })
                .catch(err => {
                    res.status(400).send("Could not update user");
                });
        }
    });
});

router.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id)
        .then(() => res.json('Deleted Product'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get("/:id", (req, res) => {
    let id = req.params.id;
    Product.findById(id, function (err, product) {
        if (err) {
            res.json("");
        } else {
            res.json(product);
        }
    })
});

router.get("/shop/:shop", (req, res) => {
    let id = req.params.shop;
    Product.find({"shop": id}, function (err, product) {
        if (err) {
            res.json("");
        } else {
            res.json(product);
        }
    })
});

module.exports = router;