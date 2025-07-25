import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "../../../../lib/prisma";
import { getCountryFromCoordinates } from "../../../../lib/actions/geocode";


export async function GET() {

  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Not Authenticated", { status: 401 });
    }

    const locations = await prisma.location.findMany({
      where: {
        trip: { userId: session.user?.id },
      },
      select: {
        locationTitle: true,
        lat: true,
        lng: true,
        trip: { select: { title: true } },
      },
    });

    const transformedLocations = await Promise.all(
      locations.map(async (loc) => {
        try {
          const geocodeResult = await getCountryFromCoordinates(loc.lat, loc.lng);
          return {
            name: `${loc.trip.title} - ${geocodeResult.formattedAddress}`,
            lat: loc.lat,
            lng: loc.lng,
            country: geocodeResult.country,
          };
        } catch {
          return {
            name: `${loc.trip.title} - Unknown Location`,
            lat: loc.lat,
            lng: loc.lng,
            country: "Unknown",
          };
        }
      })
    );

    if (process.env.NODE_ENV === "development") {
      console.log(transformedLocations);
    }

    return NextResponse.json(transformedLocations);
  } catch (_err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
