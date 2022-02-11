var express=require("express");
var bodyParser=require("body-parser");
  
const mongoose = require('mongoose');
const { format } = require("express/lib/response");
mongoose.connect('mongodb://localhost:27017/registration');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})
  
var app=express()
  
  
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.post('/sign_up', function(req,res){
    var name = req.body.name;
    var email =req.body.email;
    var pass = req.body.pass;
    
  
    var data = {
        "name": name,
        "email":email,
        "password":pass,
        
    }
db.collection('details').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
              
    });
          
    return res.redirect('signup_success.html');
})
  
  
app.get('/',function(req,res){
    res.set({
       'Access-control-Allow-Origin': '*'
    });
    return res.redirect('registration form.html');
 }).listen(3000)
  
  
console.log("server listening at port 3000");

/*
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('../src/models/user')

mongoose.connect('mongodb://localhost:27017/login-app-db', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})
const app = express()
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())

app.post('/api/change-password', async (req, res) => {
    console.log(req.body)
    res.json({status:ok})
})

app.listen(9999, () => {
	console.log('Server up at 9999')
})*/