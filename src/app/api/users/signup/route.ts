import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"

connect()

export async function POST(request: NextRequest) {
    try{
        const reqBody = await request.json()
        const {email, username, password} = reqBody

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exist"}, {status: 400})
        }


        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt);

        const newUser = new User ({
            username,
            email,
            password: hashPassword
        })

        const saveUser = await newUser.save()

        return NextResponse.json({message: "User created successfully",
            saveUser,
            success: true
        })

    }
    catch(error: any){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

