var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);      //return all the users in json format
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        number: req.body.number,
        date: req.body.date,
        age: req.body.age,
        batch: req.body.batch,
        manager: req.body.manager,
        //shop: req.body.shop,
        OpenTime: req.body.OpenTime,
        CloseTime: req.body.CloseTime,
        wallet: req.body.wallet,
        type: req.body.type,
    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// GET request
// Getting user info from user id  
//its like doing localhost:3000/users/1  , this would give you the info of user with id 1
router.get("/:id", (req, res) => {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        if (err) {
            res.json("");
        } else {
            res.json(user);
        }
    })
});

router.post("/login", (req, res) => {

    const email = req.body.email;
    const pass = req.body.password;
    //const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            //return res.status(404).send("Email not found");
            // console.error("Email not found");
            // res.status(401).send("no email found");

            return res.status(404).send("no email found");
        }
        else {
            if (pass === user.password) {
                res.send(user._id);
                return user._id;
            }
            else {
                return res.status(404).send("no email found");
            }
        }
    });
});

// router.put('/edit', (req, res, next) => {
//     const id = req.user.id
//     const update = {$set:{image: req.body.image}}
//     User.findByIdAndUpdate(id, query, {new: true, useFindAndModify: false})
//     .then()
// });

router.post('/edit/:id', (req, res) => {

    User.findById(req.params.id, function (err, user) {
        if (!user)
            return next(new Error('Unable To Find user With This Id'));
        else {
            user.name = req.body.name;
            user.password = req.body.password;
            user.email = req.body.email;
            user.number = req.body.number;
            user.age = req.body.age;
            user.batch = req.body.batch;
            user.manager = req.body.manager;
            //user.shop = req.body.shop;
            user.OpenTime = req.body.OpenTime;
            user.CloseTime = req.body.CloseTime;
            user.type = req.body.type;

            user.save()
                .then(emp => {
                    res.json('User updated Successfully');
                })
                .catch(err => {
                    res.status(400).send("Unable To Update user");
                });
        }
    });
});

router.post('/wallet/:id', (req, res) => {

    User.findById(req.params.id, function (err, user) {
        if (!user)
            return next(new Error('Unable To Find user With This Id'));
        else {
            user.wallet = req.body.wallet;

            user.save()
                .then(emp => {
                    res.json('User updated Successfully');
                })
                .catch(err => {
                    res.status(400).send("Unable To Update user");
                });
        }
    });
});

module.exports = router;