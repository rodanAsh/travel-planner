"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "../../../../lib/utils";
import { Button } from "@/components/ui/button";
import { createTrip } from "../../../../lib/actions/create-trip";
import { useState, useTransition } from "react";
import { UploadButton } from "../../../../lib/upload-thing";
import Image from "next/image";


export default function NewTrip() {
    const [isPending, startTransition] = useTransition();
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    return (
        <div className="max-w-lg mx-auto mt-10">
            <Card>
                <CardHeader>New Trip</CardHeader>
                <CardContent>
                    <form 
                        className="space-y-6"
                        action={(formData: FormData) => {
                            if (imageUrl) {
                                formData.append("imageUrl", imageUrl);
                            }
                            startTransition(() => {
                                createTrip(formData)
                            })   
                        }}
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <input 
                                type="text" 
                                name="title" 
                                placeholder="Japan trip..."
                                className={cn(
                                    "w-full border border-gray-300 px-3 py-2",
                                    "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                )} 
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea  
                                name="description" 
                                placeholder="Trip description..."
                                className={cn(
                                    "w-full border border-gray-300 px-3 py-2",
                                    "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                )} 
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Start Date
                                </label>
                                <input 
                                    type="date" 
                                    name="startDate" 
                                    className={cn(
                                        "w-full border border-gray-300 px-3 py-2",
                                        "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    )} 
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    End Date
                                </label>
                                <input 
                                    type="date" 
                                    name="endDate" 
                                    className={cn(
                                        "w-full border border-gray-300 px-3 py-2",
                                        "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    )} 
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Trip Image
                            </label>

                            {
                                imageUrl && (
                                    <Image 
                                        src={imageUrl} 
                                        alt="Trip Preview" 
                                        className="w-full mt-2 mb-4 rounded-md max-h-48 object-cover" 
                                        width={300}
                                        height={100}
                                    />
                                )
                            }

                            <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                    if (res && res[0].ufsUrl) {
                                        setImageUrl(res[0].ufsUrl);
                                    }
                                }}
                                onUploadError={(err) => {
                                    console.log("Upload Error: ", err);
                                }}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isPending}
                        >
                            { isPending ? "Creating your trip..." : "Create Trip" }
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}