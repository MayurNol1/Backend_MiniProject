const mongoose=require("mongoose");

// Establish Connection
main()
    .then(()=>{
        console.log("Connection successful");
    })
    .catch((err)=>{
        console.log(err);
    })

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

// Define Schema
const userSchema= new mongoose.Schema({
    name:String,
    age:Number,
    email:String,
});


// For creating Model
const User= mongoose.model("User",userSchema);

// // To insert user
// const user1=new User({
//     name:"Mayur",
//     age:20,
//     email:"M@gmail.com"
// });

// // Save into db
// user1.save();

// Insert many

// User.insertMany([
//     {name:"Yuvi",age:24,email:"Y@gmail.com"},
//     {name:"Divyesh",age:22,email:"D@gmail.com"},
//     {name:"Dhruvi",age:22,email:"D@gmail.com"},
// ]).then((data)=>{
//     console.log(data);
// })

// Find

User.find({age:{$gte: 22}})
    .then((res)=>{
     console.log(res);
    });
