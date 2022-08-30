const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../authentication/auth')


router.get('/profile', auth, async(req, res)=>{
    try{
        await req.user.populate('connection').execPopulate();
        res.send(req.user.connection);
    }catch(e){
        res.status(404).send({
            error:"Unable to view the profile"
        })
    }
});

router.get('/user-list', async(req, res)=>{
    try{
        let list = await User.find();
        res.send(list);
    }catch(e){
        res.status(404).send('Something went wrong');
    }
})

router.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    try{
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.send({
            user, token
        })
    }catch(e){
        res.status(404).send('Unable to Login');
    }
});

router.post('/signup', async (req, res)=>{
    const user = new User(req.body);
    let errorMessage = "Something went wrong";
    try{
        const isAlreadySignup = await User.findOne({email:req.body.email});
        if(isAlreadySignup){
            errorMessage = "Already a User, Please login";
            throw new Error();
        }
        await user.save();
        res.send(user);
    }catch(e){
        res.status(404).send({
            error:errorMessage
        })
    }
});


router.post('/logout',auth, async (req, res)=>{
    try{
        req.user.token = "";
        await req.user.save();
        res.send({'Successfully logout' : req.user});
    }catch(e){

    }
})

module.exports = router;