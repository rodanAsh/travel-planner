"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "../../../../lib/utils";
import { Button } from "@/components/ui/button";

export default function NewTrip() {
    return (
        <div className="max-w-lg mx-auto mt-10">
            <Card>
                <CardHeader>New Trip</CardHeader>
                <CardContent>
                    <form className="space-y-6">
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
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                        >
                            Create Trip
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}