import express  from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import auth from './router/auth.js'
import product from './router/product.js'
import cart from  './router/cart.js'
import cors from "cors"
import morgan from "morgan";
const app=express()
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// app.use(cookieParser());
// app.use(bodyParser.json({ limit: "10mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(morgan("dev"))

app.use("/auth",auth)
app.use("/product",product)
app.use("/cart",cart)
app.use("/asset", express.static(process.cwd() + "/image"));


 mongoose.connect("mongodb://127.0.0.1:27017/metropack",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => app.listen(5000, () => console.log(" metroDataBase  connect.....")))
  .catch((error) => {
    console.log(error);
  })