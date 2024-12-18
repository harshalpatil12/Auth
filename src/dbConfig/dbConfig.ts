import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection

        connection.on('connected', ()=>{
            console.log("Mongodb successfuly connected")
        })

        connection.on('error', (err)=> {
            console.log("Mongodb connection error please make sure network is connected")
            process.exit();
        })
    }
    catch{
        console.log("Something weng wrong")
    }
} 