import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/UserSchema";
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"


export async function POST (request:NextRequest){
    try {
        await connect();
        const reqBody = await request.json();

        
        const {firstName,lastName,email,password} = reqBody;

        

        if(!firstName || !lastName || !email || !password)
            return NextResponse.json({error: "Not Valid"}, {status: 400});
        
        const user = await User.findOne({email});

        
        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        const newUser = new User({
            firstName,
            lastName,
            email,
            password : hashedPassword,
        })

        
        const savedUser = await newUser.save();
        

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}