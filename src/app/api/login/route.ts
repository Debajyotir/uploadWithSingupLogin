import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/UserSchema";
import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"


export async function POST (request:NextRequest){
    try {
        await connect();
        const reqBody = await request.json();

        
        const {email,password} = reqBody;

        

        if( !email || !password)
            return NextResponse.json({error: "Not Valid"}, {status: 400});
        
        const user = await User.findOne({email});

        
        if(!user){
            return NextResponse.json({error: "User dose not exist"}, {status: 400});
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if(!validPassword){
            return NextResponse.json({error: "Wrong Password"}, {status: 400});
        }

        const tokenData = {
            id: user._id,
            firstName: user.firstName,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.NEXTAUTH_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true, 
            
        })
        return response;
        

        

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}