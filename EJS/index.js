const express = require("express");
const app=express();
const path=require('path');

const port=8080;

// For the static files
app.use(express.static(path.join(__dirname,"public")));

// This line is for give path of views folder even when we call from other directory
app.set("views",path.join(__dirname,"/views"));
// this line is for ejs-----------------------
app.set("view engine","ejs")
// With help of ejs we don't send res , we render response
app.listen(port,()=>{
    console.log(`Server is live in port no. ${port}`);
});

app.get('/',(req,res)=>{
    res.render("home.ejs");
});


//  For send data from Database
// For Conditional satement check .ejs
app.get('/rolldice',(req,res)=>{
    let dice= Math.floor(Math.random()*6)+1;
    res.render("rolldice.ejs",{dice});
})


// For the LOOP
// app.get('/:username',(req,res)=>{
//     let follower=["Mayur","Nol","Rajula"];
//     let {username}= req.params;
//     res.render("insta.ejs",{follower,username});
// })

// for Instagram

app.get("/id/:username",(req,res)=>{
    const {username} = req.params;
    const data= require("./data.json");
    const instaData = data[username]
    // console.log(instaData)
    res.render("insta.ejs",{ instaData });
})