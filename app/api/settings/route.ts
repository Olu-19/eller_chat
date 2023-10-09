import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {
            name,
            image,
            bio,
        } = body;

        if (!currentUser?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                image,
                name,
                bio,
            }
        });

        return NextResponse.json(updatedUser);


    } catch (error: any) {
        console.log(`ERROR_UPDATING_SETTINGS: ${error.message}`);
        return new NextResponse("Internal error", { status: 500 });
    }
}