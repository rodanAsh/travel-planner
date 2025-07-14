"use server";

import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { prisma } from "../prisma";

export async function createTrip(formData: FormData) {
    const session = await auth();

    if (!session || !session.user?.id) {
        throw new Error("not Authenticated.");
    }

    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const startDateStr = formData.get("startDate")?.toString();
    const endDateStr = formData.get("endDate")?.toString();

    if (!title || !description || !startDateStr || !endDateStr) {
        throw new Error("All fields are required.")
    }

    // converting string dates into js date types
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    // create trip data into our database
    await prisma.trip.create({
        data: {
            title,
            description,
            imageUrl,
            startDate,
            endDate,
            userId: session.user.id
        }
    })

    redirect("/trips");
}