

import connectDB from "./db/index.js";
import dotenv from  "dotenv"
import {app} from "./app.js"

dotenv.config({
    path: "./env"
})
connectDB()
.then( () => {
    app.listen(process.env.PORT || 8000, ()=> {
        console.log(`Server is listening on PORT ${process.env.PORT}`);
    })
})
.catch( (error) => {
    console.log("MONGO DB Error ", error);
})


// import mongoose from 'mongoose'
// import DB_NAME from "./constants"
// import express from "express"
// import express from 'express';

// const app = express()



// ;( async ()=> {
//     try{
//         const connectionState = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         app.on( (error)=> {
//             console.log("Error: ", error)
//             throw error
//         })

//         app.listen(process.env.PORT, ()=> {
//             console.log(`Server is listening on PORT ${process.env.PORT}`);
//         })
//     }
//     catch (error){
//         console.error("Connection Error",error)
//         throw error
//     }
// })()