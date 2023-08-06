import express, { Router } from "express"

import { cart, cartCount, getCart } from "../controller/cart.js"
const router=express.Router()


router.post("/add",cart)
router.get("/getCart",getCart)

router.get("/count",cartCount)



export default router