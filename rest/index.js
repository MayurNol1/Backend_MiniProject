const express= require('express');
const app= express();
const port= 3000;
const path=require('path');
const {v4:uuidv4 }=require('uuid');
const methodOverride=require('method-override');


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuidv4(),
        username:"Mayur",
        content:"Hey it's me Mayur!!"
    },
    {
        id:uuidv4(),
        username:"Dhruvi",
        content:"Hey it's me Dharuvi!!"
    },
    {
        id:uuidv4(),
        username:"Yuvi",
        content:"Hey it's me Yuvi!!"
    }
];


app.listen(port, ()=>{
    console.log(`You are lisning to port : ${port}`);
});

app.get('/',(req,res)=>{
    res.send(`Server is working well!! try /posts`);
})

app.get('/posts',(req,res)=>{
    res.render("index.ejs",{ posts });
})

app.get('/posts/new',(req,res)=>{
    res.render("newForm.ejs");
})

app.get('/posts/:id',(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id ===p.id);
    // console.log(post)
    res.render("show.ejs",{ post });
})

app.post('/posts',(req,res)=>{
    let{username,content}= req.body;
    let id= uuidv4();
    // console.log(NewId);
    posts.push({id,username,content});
    res.redirect('/posts');
    // redirect send get request by default
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}= req.params;
    let post = posts.find((p)=> id===p.id);
    res.render("update.ejs",{post})
    // res.send("edit request recived")
})

app.patch("/posts/:id",(req,res)=>{
    let {id}= req.params;
    let newC = req.body.content;
    let post = posts.find((p)=> id===p.id);
    post.content = newC;
    // res.send("PATCH request working")
    // res.render("update.ejs",{post})
    res.redirect('/posts');
})

app.delete("/posts/:id",(req,res)=>{
    // res.send("delete")
    let {id}= req.params;
    posts = posts.filter((p)=> id !== p.id);
    res.redirect('/posts');
})