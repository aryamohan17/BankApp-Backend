// import mongoose
const mongoose = require("mongoose")

// 
mongoose.connect('mongodb://127.0.0.1:27017/bankServer',{useNewUrlParser:true})
// model name is singular form of collection name and 1st letter capital.
const User = mongoose.model('User',{
    accno:Number,username:String,password:String,balance:Number,transaction:[]
})
module.exports={
User
}