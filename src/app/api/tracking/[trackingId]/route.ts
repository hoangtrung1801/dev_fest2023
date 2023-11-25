import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    trackingId: string
) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Not authorized', { status: 401 });
        }


        const tracking = await prisma.tracking.findUnique({
            where: {
                id: trackingId
            }
        })
        if (!tracking) {
            console.log('Tracking not found')
            return new NextResponse('Tracking not found', { status: 404 });
        }

        if (tracking) {
            console.log('Tracking found')
            return NextResponse.json(tracking);
        }

    } catch (error) {
        console.log('Error in getTrackingById ??: ', error)
        return new NextResponse('Error in getTrackingById ???', { status: 500 });
    }
}