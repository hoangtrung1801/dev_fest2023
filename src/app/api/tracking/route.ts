import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(
    request: Request,
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {
            namePlant,
            imagePlant,
            descriptionPlant,
            statusPlant,
            qualityPlant,
            haveDiseasePlant
        } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Not authorized', { status: 401 });
        }


        const newTracking = await prisma.tracking.create({
            data: {         
                namePlant,
                imagePlant,
                descriptionPlant,
                statusPlant,
                qualityPlant,
                haveDiseasePlant,
                userId: currentUser.id,
            },
        })


        return NextResponse.json(newTracking);
    } catch (error) {
        return new NextResponse('Tracking Error ???', { status: 500 });
    }
}


export async function GET(
    request: Request,
){

    try {
        const currentUser = await getCurrentUser();
        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Not authorized', { status: 401 });
        }

        const allTracking = await prisma.tracking.findMany({
            where:{
                userId:currentUser.id
            }

        })
        return NextResponse.json(allTracking);
        
    } catch (error) {
        return new NextResponse('Geting All Tracking error API', { status: 500 });
        
    }

}

// create function getTrackingById
