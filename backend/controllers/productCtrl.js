const express = require ("express");
const asyncHandler = require("express-async-handler");
const Product = require ('../models/product'); 



const newProduct = asyncHandler(async(req, res)=> {
    const newproduct = new Product(
        {
            name: req.body.name,
            price: req.body.price,
            inStock: req.body.inStock
        }
    )
    const product = await newproduct.save();
    res.send({message: 'product added', product})
})


//delete product
const deleteProduct = asyncHandler(async(req, res)=> {
    const productId = req.params.id
    const product = await Product.findByIdAndDelete(productId);

    if(product){
        await product.remove();
        res.send({message: 'product deleted'})
    } else {
        res.status(404).send('Product couldn\'t be found')
    }
})


//list All Products
const getAll = asyncHandler(async(req, res)=> {
    const products = await Product.find();
    res.json(products)
})


module.exports = {newProduct, deleteProduct, getAll}