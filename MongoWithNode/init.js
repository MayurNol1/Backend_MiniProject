const mongoose=require("mongoose");
const Chat=require("./models/chat.js");

main()
    .then(()=>{
        console.log("connection Successful");
    }).catch((err)=>{
        console.log(err);
    });

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};

let chats= [
    {
        from:"Mayur",
        to: "Div",
        msg:"Kem party majama!!",
        created_at: new Date(),
    },
    {
        from:"Yuvi",
        to: "Dhruvi",
        msg:"Hey how are you",
        created_at: new Date(),
    },
    {
        from:"tony",
        to: "mony",
        msg:"How do you do?",
        created_at: new Date(),
    },
    {
        from:"rahul",
        to: "priya",
        msg:"I love you 3000",
        created_at: new Date(),
    },
    {
        from:"mehil",
        to: "gun",
        msg:"Kem che bhai?",
        created_at: new Date(),
    },
    {
        from:"Payal",
        to: "Rinal",
        msg:"Hey rinal",
        created_at: new Date(),
    },
    {
        from:"diip",
        to: "dhruv",
        msg:"shu thayu?",
        created_at: new Date(),
    },
    {
        from:"astha",
        to: "hemanshi",
        msg:"aam to jo pelo...",
        created_at: new Date(),
    },
]

// Chat.insertMany(chats);


// chat1
//     .save()
//     .then((res)=>{
//         console.log(res);
//     }).catch((err)=>{
//         console.log(err);
//     })

Chat.find().then((res)=>{
    console.log(res);
})