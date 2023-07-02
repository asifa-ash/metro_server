import express, { Router } from "express"
import multer from "multer"
import { uploadCtr } from "../controller/product.js"
import storage from "../config/multer.js"
const router=express.Router()
const upload=multer({storage:storage})

router.post("/upload",upload.single("image"),uploadCtr)



export default router
