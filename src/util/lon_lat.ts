/**
 * Switches the long-lat format provided by Google Maps around
 * @param input The input to switch
 */
export function switchLonLat(input: [number, number]): [number, number] {
    return [input[1], input[0]];
}