import express, { Router } from "express"
import multer from "multer"
import { deleteProduct, getAllProduct, getProduct, updateProduct, uploadCtr } from "../controller/product.js"
import storage from "../config/multer.js"
const router=express.Router()
const upload=multer({storage:storage})

router.post("/upload",upload.single("image"),uploadCtr)
router.get('/getAll',getAllProduct)
router.get('/:id',getProduct)
router.put('/update/:id',updateProduct)
router.delete('/delete/:id',deleteProduct)



export default router
