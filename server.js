const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/productschema')
const app=express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello world');
})

app.get('/blog',(req,res)=>{
    res.send('Hello blog');
})

app.get('/products',async (req,res)=>{
    try {
        const product = await Product.find({});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.get('/products/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product); 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.put('/products/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            return res.status(400).json({message: `cannot find any product with Id ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct); 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('/products/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(400).json({message: `cannot find any product with Id ${id}`})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/product',async (req,res)=>{
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


mongoose.set("strictQuery",false)
mongoose.connect('mongodb+srv://admin:root@crud-api.wsunpyp.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>{
    console.log("connected to db");
    app.listen(3000,()=>{
        console.log('Node API is listening on port 3000');
    })
}).catch((error)=>{
    console.log(error);
})