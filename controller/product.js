import ProductModel from "../model/Product.js"

export const uploadCtr=async(req,res)=>{
    console.log(req.body, req.file, "pppp");
    console.log(req.body,"nmnmnmmmm");
    try{
        const proData=await ProductModel(req.body,req.file)
        console.log(proData,"hhhhhh");
        await proData.save();

    }catch(error){
        console.log(error);
    }
    
}