import ProductModel from "../model/Product.js"

export const uploadCtr=async(req,res)=>{
    
    
    try{
        const proData=await ProductModel({...req.body,image:`asset/${req.file.originalname}`})
    
        await proData.save();

    }catch(error){
        console.log(error);
    }
    
}

export const getAllProduct=async(req,res)=>{
    try{
        const Products=await ProductModel.find()
        console.log(Products, "hhghh");

    res.status(201).json(Products);

    }catch(err){
        console.log(err);
    }

}
export const getProduct=async(req,res)=>{

}
export const updateProduct=async(req,res)=>{

}
export const deleteProduct=async(req,res)=>{

}

