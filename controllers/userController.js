// api route for users

const express = require('express')
const User = require('../models/User')
const router = express.Router();
const bcrypt = require('bcrypt');
const { createUserToken } = require('../middleware/authorization');

// FINDING ALL USERS DEV
router.get('/createaccount', (req, res, next) =>{
    User.find()
    .then((users) => res.json(users))
    .catch(next);
})

//SIGN UP FOR ACCOUNT
router.post('/createaccount', async (req, res, next) => {
    
    try {
        const { email } = req.body
        const password = await bcrypt.hash(req.body.password, 12)
        const user = await User.create({ email, password })
        res.status(201).json(user)
    } catch (err) {
        return next(err)
    }
});

//LOG IN 
router.post('/login', (req, res, next) => {
    User.findOne( {email: req.body.email})
    .then((user) => {
        console.log(user)
        console.log(req)
        return createUserToken(req, user)
    })
    .then((token) => res.json({ token }))
    .catch(next)
});

module.exports = router