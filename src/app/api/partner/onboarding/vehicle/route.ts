import { auth } from "@/auth";
import connectDB from "@/lib/db";
import User from "@/models/user.model";
import Vehicle from "@/models/vehicle.model";
import { NextRequest } from "next/server";

const VEHICLE_REGEX = /^[A-Z]{2}[0-9]{1,2}[A-Z]{0,2}[0-9]{4}$/;

export async function POST(req: Request){
    try{
        connectDB();
        const session = await auth()
        if(!session || !session.user.email){
            return Response.json(
                {message: "unauthorized"},
                {status: 400}
            )
        }

        const user = await User.findOne({email: session.user.email})

        if(!user){
            return Response.json(
                {message: "user not found"},
                {status: 400}
            )
        }

        const {type, vehicleModle, number} = await req.json()

        if(!type || !vehicleModle || !number) {
            return Response.json(
                {message: "missing required details"},
                {status: 400}
            )
        }

        if(VEHICLE_REGEX.test(number)){
            return Response.json(
                {message: "Invalid vehicle number format"},
                {status: 400}
            )
        }

        const vehicleNumber = number.toUpperCase()

        const duplicate = await Vehicle.findOne({vehicleNumber})
        if(duplicate){
            return Response.json(
                {message: "Vehicle already registered"},
                {status: 400}
            )
        }


        let vehicle = await Vehicle.findOne({owner: session.user.id})
        if(vehicle){
            vehicle.type = type
            vehicle.vehicleNumber = vehicleNumber
            vehicle.vehicleModle = vehicleModle
            vehicle.status = "pendding"
            await vehicle.save()

            return Response.json(
                vehicle,
                {status: 200}
            )
        }

        vehicle = await Vehicle.create({
            type,
            vehicleNumber,
            vehicleModle
        })

        if(user.partnerOnboardingSteps < 1){
            user.partnerOnboardingSteps = 1
        }

        return Response.json(
            vehicle,
            {status: 201}
        )

    }catch(error){
        return Response.json(
                {message: `vehicle error ${error}`},
                {status: 500}
            )
    }
}


export async function GET(req: NextRequest){
    try{
        connectDB();
        const session = await auth()
        if(!session || !session.user.email){
            return Response.json(
                {message: "unauthorized"},
                {status: 400}
            )
        }

        const user = await User.findOne({email: session.user.email})

        if(!user){
            return Response.json(
                {message: "user not found"},
                {status: 400}
            )
        }

        const vehicle = await Vehicle.findOne({owner: session.user._id})
        if(vehicle){
            return Response.json(
                vehicle,
                {status: 201}
            )
        } else {
            return new Response(null, { status: 204 });
        }
        
    }catch(error){
        return Response.json(
                {message: `GET vehicle error ${error}`},
                {status: 500}
        )
    }
}