import prisma from "@/app/libs/prismadb";

export default async function getTrackingById(trackingId: string) {
    try {
        const tracking = await prisma.thread.findUnique({
            where: {
                id: trackingId,
            },
        });
        if (!tracking) {
            console.log("Tracking not found");
            return new Error("Tracking not found");
        }

        if (tracking) {
            console.log("Tracking found");
            return {
                ...tracking,
                createAt: tracking.createdAt.toString(),
            };
        }
    } catch (error) {
        console.log("Error in getTrackingById: ", error);
        return null;
    }
}
