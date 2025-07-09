const mongoose=require("mongoose");
    

const chatScema=new mongoose.Schema({
    from:{
        type:String,
        required :true
    },

    to:{
        type:String,
        required :true
    },
    msg:{
        type:String,
        maxLength:50,
    },
    created_at:{
        type: Date,
        required :true
    },
});

const Chat= mongoose.model("Chat",chatScema);

module.exports= Chat;