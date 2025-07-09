const express = require('express');
const app = express();

// console.dir(app)

let port=3000;

app.listen(port,()=>{
    console.log(`Server is live in port no. ${port}`);
});

// app.use((req,res)=>{
//     console.log("Request recived");
//     let code='<H1>Fruits</H1><ui><li>Orange</li><li>apple</li></ui>'
//     res.send(code)
// });

app.get("/",(req,res)=>{
    res.send("<h1>This is home Page<h1>")
    
})

// app.get("/search",(req,res)=>{
//     res.send("This is Search Page")
// })

// app.get("/login",(req,res)=>{
//     res.send("This is login Page")
// })



// // For all other path that not exits

// app.get("*",(req,res)=>{
//     res.send("The path is not exits")
// })

// app.get("/:username/:id",(req,res)=>{
//     res.send(req.params)
//     // res.send(`this is username page`)
// })

app.get("/search",(req,res)=>{
    console.log(req.query)
    let {q}= req.query;
    if(!q){
        res.send("Nothing search")
    }
    res.send(`The query is : ${q}`);
})