import PocketBase from "pocketbase";
import {z} from "zod";

const url = "https://api.schulwegwarnung.de";
const pb = new PocketBase(url);

export const ImageUrl = url + "/api/files/";

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
            return "#203abd";
        default:
            return "#44464f";
    }
}

/**
 * Figures the color for a given label out
 * Available labels are 'Winter, Ausfahrt, Nicht einsehbar, Unübersichtlich, Ampel, Kreuzung'
 * @param label The label
 */
export function getColorForLabel(label: string): string {
    switch (label.toUpperCase()) {
        case "WINTER":
            return "#457abf";
        case "AUSFAHRT":
            return "#57bd8a";
        case "NICHT EINSEHBAR":
            return "#ba2342";
        case "UNÜBERSICHTLICH":
            return "#2079bd";
        case "AMPEL":
            return "#bd6420";
        case "KREUZUNG":
            return "#5c20bd"
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
    recommendation: string;
}

/**
 * Represents the database schema for a marker
 */
const markerSchema = z.object({
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
    level: z.string(),
    recommendation: z.string(),
})

/**
 * Fetches all markers for a given location
 */
export async function fetchMarkers(): Promise<Marker[]> {
    const markers = await pb.collection("markers").getFullList();
    return markers.map((marker) => markerSchema.parse(marker) as Marker);
}
