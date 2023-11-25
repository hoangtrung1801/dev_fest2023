import prisma from "@/app/libs/prismadb";

export default async function getThread(threadId: string) {
    try {
        const thread = await prisma.thread.findUnique({
            where: {
                id: threadId,
            },
        });
        if (!thread) {
            return new Error("Tracking not found");
        }

        if (thread) {
            return {
                ...thread,
                createAt: thread.createdAt.toString(),
            };
        }
    } catch (error) {
        throw new Error("Cannot get thread by id");
    }
}
