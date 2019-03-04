const router = require('express').Router();
const User = require('../models/user');
const config = require('../config/secret');

router.post('/signup', (req, res, next) => {
    if(req.session.user){
        return res.send('You already signed in');
    }
    User.findOne({ email: req.body.email}, (err, existingUser)=> {
        if(err)
        {
            res.status(400);
            return res.send('Error');
        } else if(existingUser){
            res.status(400);
            res.send('Account already Exist with this email !');
        } else{
            var user = new User();
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.password = req.body.password;
            user.age = req.body.age;
            user.gender = req.body.gender;
            user.address = req.body.address;
            user.email = req.body.email;

            user.save((err)=>{
                if(err) return res.status(400).send(err);

                req.session.user = user;
                console.log(req.session.user);
                res.send(200, "Successfully created new user!")
            })
        }
    })
});

router.get('/logout', (req, res, next)=>{
    if(req.session.user){
        req.session.destroy((err)=>{
            if(err)
                return res.status(400).send('Can\'t Logout!');
            return res.status(200).send('Succesfully logged out!')
        });
    } else{
        return res.status(400).send('No user Logged in');
    }
})

module.exports = router;