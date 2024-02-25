import { app } from "./app.js";
//require('dotenv').config("./env")
import dotenv from "dotenv";

import connectDb from "./db/index.js";

//import mongoose from "mongoose";

//import {DB_NAME} from "./constants"
dotenv.config({
    path:'./env'
})

connectDb()
.then(()=>{
    app.listen(process.env.PORT||8080, ()=>{
        console.log(`Server started at port ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log(error)
})

/***************second process***************** */
/*
const app = exppress();

(async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/{DB_NAME}`)
        app.on("error", (error){
            console.log("ERR", error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`server started at port ${process.env.PORT}`);
        })
    }catch(error){console.log(error)}
})()*/