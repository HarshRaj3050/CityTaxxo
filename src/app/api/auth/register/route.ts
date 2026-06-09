import connectDB from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const {name, email, password} = await req.json();
        await connectDB();
        let user = await User.findOne({email});
        if(user) {
            return NextResponse.json(
                {message: "Email already exist!"},
                {status: 400}
            )
        }
        if(password.length <= 6){
            return NextResponse.json(
                {meassage: "password must be at least 6 characters"},
                {status: 400}
            )
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        return NextResponse.json(
            user,
            {status: 201}
        )

    } catch (error) {

        return NextResponse.json(
            {message: `Register Error: ${error}`},
            {status: 500}
        )
    }
}