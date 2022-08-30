const express = require('express');
const router = new express.Router();
const Store = require('../models/store');
const auth = require('../authentication/auth')

// CRUD operation has been done
// home route
router.get('/',  async (req, res)=>{
    try{
        const ListofProduct = await Store.find();
        res.send(ListofProduct);
    }catch(e){
        res.status(500).send({
            error:"Unable to get the list"
        })
    }
});

// add product route
router.post('/add-product', auth, async (req, res)=>{
    const product = new Store({
        ...req.body,
        userTasks:req.user._id
    });
    try{
        await product.save();
        res.send(product);
    }catch(e){
        res.status(404).send({
            error:"Unable to save the item"
        });
    }
});
// delete any product 
router.post('/delete-product',auth, async (req, res)=>{
    try{
        const _id = req.body._id;
        await Store.findOneAndDelete({_id, userTasks:req.user._id});
        res.send({
            data:"Successfully deleted",
        })
    }catch(e){
        res.status(404).send({
            error:"Something went wrong"
        });
    }
})

// update 
router.post('/update-product/:id',auth, async (req, res)=>{
    try{
        console.log(req.params.id);
        let item = await Store.findOne({
            _id:req.params.id
        });
        console.log(item);
        let updatedItem = Object.keys(req.body);
        updatedItem.forEach((key)=>{
            item[key] = req.body[key];
        })
        await item.save();
        res.send("Successfully Updated");
    }catch(e){
        res.status(404).send({
            error:"Unable to Update"
        })
    }
})

module.exports = router;