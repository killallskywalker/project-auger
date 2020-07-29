
const Plan = require('../model/Plan');
const publisher =  require('../helper/index');
module.exports = {
    getPlan: async (req , res , next) =>{
        try{
            const plan = await Plan.findById(req.params.id);
            if(plan){
                return res.send({success:true,message:"Retrieve success",data:plan},200);
            }else{
                return res.send({success:false,message:"Not found",data:null},404);
            }
        }catch(err){
            next(err)
        }
    },

    getPlans: async (req , res , next) =>{
        try{
            const plans = await Plan.find();
            if(plans){
                return res.send({success:true,message:"Retrieve success",data:plans},200);
            }else{
                return res.send({success:false,message:"Not found",data:null},404);
            }
        }catch(err){
            next(err)
        }
    },
    
    getPlanQuotation: async (req, res , next) =>{
        try{
            const plans = await Plan.find({categoryCover:{ "$in" : req.body.category } });
            await publisher.publishToSnS(
                {data:plans , template:'quotation-mail.hbs' , subject:'Quotation' , email:req.body.email}  , `arn:aws:sns:ap-southeast-1:567650660041:${process.env.QUOTATION}`
            );
            return res.send({success:true,message:"Enquiry success , we will send quotation through email",data:plans});
        }catch(err){
            next(err)
        }
    }
}