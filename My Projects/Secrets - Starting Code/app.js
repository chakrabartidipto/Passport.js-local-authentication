//jshint esversion:6
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const encrypt = require('mongoose-encryption');
const session= require('express-session');
const passport= require("passport");
const passportLocalMongoose= require("passport-local-mongoose"); 
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(session({
    secret: 'Our dirty Little secret',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  }));

app.use(passport.initialize());
app.use(passport.session());




mongoose.connect('mongodb://localhost:27017/userDB', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

app.set('view engine', 'ejs');

const userSchema= new mongoose.Schema({
    userName: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("user", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req,res){

    res.render("home");
});


app.get("/login", function(req,res){

res.render("login");

});


app.get("/register", function(req,res){

    res.render("register");
});

app.get("/secrets", function(req,res){

    if (req.isAuthenticated()){
        res.render("secrets");
    }
    else {
        res.redirect ("/login");
    }

});

app.get("/logout", function(req,res){
  
    req.logout();
    res.redirect('/');

});

app.post("/register", function(req,res){
    
    User.register({username:req.body.username}, req.body.password, function(err,result){

        if(err) {
        console.log(err);
        res.redirect("/register");
    }
        
        else {
            passport.authenticate("local") (req,res, function(){
                res.redirect("/secrets");
            });
        }
    });

});

app.post("/login",function(req,res){
    
    const user= new User ({
        username:req.body.username,
        password:req.body.password
    });

    req.login(user, function(err){
        if(err) {console.log(err);}
        else {
            passport.authenticate("local");
            res.redirect("/secrets");
        }
    });
});

app.listen(3000, function(req,res){
    console.log("Server started at port 30000");
});