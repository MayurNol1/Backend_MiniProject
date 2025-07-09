const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const Chat=require("./models/chat.js");
const methodOverirde= require("method-override");

main()
    .then(()=>{
        console.log("Database connection Successful");
    }).catch((err)=>{
        console.log(err);
    });

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public"))); 
app.use(express.urlencoded({extended: true}));
app.use(methodOverirde("_method"));


app.listen("8080",()=>{
    console.log("App is listning!!");
});

app.get("/",(req,res)=>{
    res.send("App is working");
});

// Show all chats
app.get("/chats",async (req,res)=>{
    let chat = await Chat.find();
    res.render('index.ejs',{chat});
})

// Add new Chat Route

app.get("/chats/new",((req,res)=>{
    res.render("new.ejs")
}));

// Add new chat

app.post("/chats",((req,res)=>{
    let {to,msg,from}=req.body;
    let created_at = new Date();
    let chat= {to,msg,from,created_at};

    // Chat.insertOne(chat);
    const chat1= new Chat(chat)
    

    chat1
        .save()
        .then(()=>{
            res.redirect("/chats")
        }).catch((err)=>{
            res.send("Eror:"+err);
        })
    // res.send("Added Successfuly")
}));

// Edit route
app.get("/chats/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let user = await Chat.findById(id);
    // res.send("Edited")
    res.render("edit.ejs",{user}) ;
});

// Edit
app.put("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let {msg:NewMsg} = req.body;
    let updated= await Chat.findByIdAndUpdate(id,{msg : NewMsg},{runValidators:true, new: true});
    res.redirect("/chats");
});

// DELETE
app.delete("/chats/:id",(req,res)=>{
    let {id}=req.params;
    let deleted=Chat.findByIdAndDelete(id,{runValidators:true, new: true})
                    .then((res)=>{
                        console.log(res);
                    }).catch(err=>console.log(err));
    // console.log(deleted);
    res.redirect("/chats");
})