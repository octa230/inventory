const asyncHandler = require ( 'express-async-handler');
const express = require ( 'express');
const Sale = require ( '../models/sale');
const User = require ( '../models/user');



const getSales = asyncHandler(async(req, res)=> {
    const sales = await Sale.find().populate('user', 'nameName')
    res.send(sales)
})

const makeSale = asyncHandler(async(req, res)=> {
    const newSale = await new Sale({
        saleItems: req.body.saleItems.map((x)=> ({...x, product: x._id})),
        isPaid: req.body.isPaid,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        soldBy: req.user._id
    })

    const sale = await newSale.save();
    res.status(201).send({message: 'New sale made', sale})
})

const getSingleSale = asyncHandler(async(req, res)=> {
    const sale = await Sale.findById(req.params._id)
    if(sale){
        res.send(sale)
    } else {
        res.status(404).send({message: 'sale not found'})
    }
})

const deleteSale = asyncHandler(async(req, res)=> {
    const sale = await Sale.findById(req.params._id)
    if(sale){
        await sale.remove()
        res.send({message: 'sale deleted successfully'})
    }
})

const salesSummary = asyncHandler(async(req, res)=> {
    const sales = await Sale.aggregate([
        {
            $group: {
                _id: null,
                salesNum: {$num: 1},
                totalSales: {$num: '$totalPrice'}
            }
        }
    ])

    const users = await User.aggregate([
        {
            $group:{
                _id: null,
                usersNum: {$num: 1}
            }
        }
    ])

    const dailySales = await Sale.aggregate([
        {
            $group:{
                _id: {dateToString: {format: '%Y-%m-%d', date: 'createdAt'}},
                orders: {$sum: 1},
                sales: {$sum: 'totalPrice'}
            }

        },
        {$sort:{_id: 1}}
    ])

    const units = await product.aggregate([
        {
            $group: {
                _id: '$name',
                count: {$sum: 1}
            }
        }
    ])

    res.send({sales, users, dailySales, units})
})

module.exports = {getSales, makeSale, getSingleSale, salesSummary, deleteSale}