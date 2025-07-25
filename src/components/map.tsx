"use client";

import { Location } from '@prisma/client';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { useRef } from 'react';

type MapProps = {
    itineraries: Location[];
}

export default function Map({ itineraries }: MapProps) {
    const mapRef = useRef<google.maps.Map>(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    })

    if (loadError) return <div>Error loading maps</div>

    if (!isLoaded) return <div>Loading maps...</div>

    const center = itineraries.length > 0 
        ? { lat: itineraries[0].lat, lng: itineraries[0].lng } 
        : { lat: 0, lng: 0 };

     const onMapLoad = (map: google.maps.Map) => {
        mapRef.current = map;

        itineraries.forEach(location => {
            new google.maps.marker.AdvancedMarkerElement({
                map,
                position: { lat: location.lat, lng: location.lng },
                title: location.locationTitle,
            });
        });
    }

    return (
        <GoogleMap 
            mapContainerStyle={{ width: "100%", height: "100%" }}
            zoom={8}
            center={center}
            onLoad={onMapLoad}
            options={{
                mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID!,
            }}
        />
    )
}