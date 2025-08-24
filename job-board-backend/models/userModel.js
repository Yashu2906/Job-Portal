const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type:String , required:true},
    email: {type:String , required:true , unique:true},
    password: {type:String , required:true},
    role: {type:String ,enum:["JobSeekers","Company","Admin"] , default:"JobSeekers"} ,
    createdAt: {type:Date , default:Date.now}
})

const userModel = mongoose.model.user || mongoose.model('user', userSchema);

module.exports = userModel;