const { jobModel } = require("../models/jobModel")


const approveJob = async (req , res) =>{
    try{
        const job = await jobModel.findByIdAndUpdate(req.params.id , {status:true} , {new:true})

        if(!job){
            return res.status(404).json({success:false , message: "No job found"})
        }

        return res.status(200).json({success:true , message:"Job approved successfully",job})
    }
    
        

    catch(error){
        return res.status(500).json({success:false , messaage:error.message})
    } 
}

const rejectJob = async (req,res) =>{
    try{
        const job = await jobModel.findByIdAndUpdate(req.params.id , {status:false} , {new:true})

        if(!job){
            return res.status(404).json({success:false , message:"Job not found"})
        }
        return res.status(200).json({success:true , message:"Job rejected successfully"})

    }catch(error){
        return res.status(500).json({success:false, message:error.message})
    }
}

module.exports = {approveJob , rejectJob}