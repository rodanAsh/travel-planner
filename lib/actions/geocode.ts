"use server";

export type GeocodeResult= {
    country: string;
    formattedAddress: string;
}

type AddressComponent = {
    long_name: string;
    short_name: string;
    types: string[];
}

export async function getCountryFromCoordinates(
    lat: number, 
    lng: number
): Promise<GeocodeResult> {
    
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );
    
    const data = await response.json();
    
    const result = data.results[0];
    
    const countryComponent = result.address_components.find((component: AddressComponent) => component.types.includes("country"));

    return { 
        country: countryComponent.long_name || "Unknown", 
        formattedAddress: result.formatted_address 
    };
};