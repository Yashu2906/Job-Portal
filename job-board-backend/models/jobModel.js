const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    title: {type:String , required:true},
    description: {type:String , required:true},
    location: {type:String , required:true},
    salary: {type:Number , required:true},
    company: {type:String , required:true},
    requirements: {type:[String], required:true},
    jobType:{type:String , required:true},
    experienceLevel:{type:String , required:true},
    postedBy: {type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    status:{type:String , enum:["pending","approved","rejected"],default:"pending"},
    createdAt: {type:Date , default:Date.now}
})
const jobModel = mongoose.model.job || mongoose.model('job',jobSchema)
module.exports = jobModel;