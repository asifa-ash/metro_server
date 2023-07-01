import express, { Router } from "express"
import {login, register} from "../controller/auth.js"
const router=express.Router()


router.post("/login",login)
router.post("/signup",register)


export default router