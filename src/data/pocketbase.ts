import PocketBase from "pocketbase";
import {z} from "zod";

const pb = new PocketBase("https://api.amraleth.xyz");

export const imageUrl = "https://api.amraleth.xyz/api/files/pbc_3503988954/";

/**
 * Figures the color of a marker out
 * @param level The level that marker should have
 */
export function getColorForMarkerLevel(level: string): string {
    switch (level.toUpperCase()) {
        case "IMMEDIATE":
            return "#d10816";
        case "INFERRED":
            return "#bf761d";
        case "LOW":
            return "#bed143";
        default:
            return "#1d40bf";
    }
}

/**
 * Figures the color for a given label out
 * @param label The label
 */
export function getColorForLabel(label: string): string {
    switch (label.toUpperCase()) {
        case "WINTER":
            return "#457abf";
        case "AUSFAHRT":
            return "#57bd8a";
        default:
            return "#4a544f";
    }
}

/**
 * Represents a Marker
 */
export interface Marker {
    collectionId: string;
    collectionName: string;
    id: string;
    longitude: number;
    latitude: number;
    images?: [string];
    streetName?: string;
    description?: string;
    label: [string];
    name: string;
    level: string;
}

/**
 * Represents the database schema for a marker
 */
const MarkerSchema = z.object({
    collectionId: z.string(),
    collectionName: z.string(),
    id: z.string(),
    longitude: z.number(),
    latitude: z.number(),
    images: z.array(z.string()).optional(),
    streetName: z.string().optional(),
    description: z.string().optional(),
    label: z.array(z.string()),
    name: z.string(),
    level: z.string()
})

/**
 * Fetches all markers for a given location
 * @param locationName The location, right now it fetches all of them
 */
export async function fetchMarkers(locationName: string): Promise<Marker[]> {
    const markers = await pb.collection("markers").getFullList();
    return markers.map((marker) => MarkerSchema.parse(marker) as Marker);
}