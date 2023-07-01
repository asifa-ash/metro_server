import express, { Router } from "express"

import { upload } from "../controller/product.js"
const router=express.Router()


router.post("/upload",upload)



export default router
