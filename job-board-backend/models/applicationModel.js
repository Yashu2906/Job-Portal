const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema(
    {
        jobId:{type: mongoose.Schema.Types.ObjectId,ref:"Job",required:true},
        applicationId:{type: mongoose.Schema.Types.ObjectId,ref:"user"},
        resumeUrl:{type:String,required:true},
        coverLetter:{type:String,required:true},
        status:{type:String,enum:["submitted","reviewed","shortlisted","rejected"],default:"submitted"},
        appliedAt:{type:Date,default:Date.now}
    },
    { timestamps:true }
);
module.exports = mongoose.model("Application",applicationSchema)