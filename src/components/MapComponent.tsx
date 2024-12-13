import mapboxgl, {Map, Popup, Marker as MapBoxMarker} from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {onMount} from "solid-js";
import {switchLonLat} from "../util/LatConverter";
import "../data/Pocketbase";
import {fetchMarkers, getColorForLabel, getColorForMarkerLevel, ImageUrl, Marker} from "../data/Pocketbase";

export default function MapComponent() {
    let mapContainer: string | HTMLElement;
    onMount(async () => {
        mapboxgl.accessToken = "pk.eyJ1IjoiYW1yYWxldGgiLCJhIjoiY20zc2g3d3NmMGZvNjJxcXZta3p6MGtneSJ9.ArplgD8cpuY3yrbOTZwgBw";

        //TODO: different locations
        const center: [number, number] = switchLonLat([52.47451265096441, 10.349770457268184]);
        const markers: Marker[] = await fetchMarkers();

        const map = new Map({
            // @ts-ignore
            container: mapContainer,
            center: center,
            zoom: 15,
            style: "mapbox://styles/mapbox/satellite-streets-v12"
        });

        map.on("load", () => {
            markers.forEach((marker: Marker) => {

                let popUpContent: string = `
                <div>
                    <div>
                        <p class='text-lg font-bold'>${marker.name}</p>
                    </div>
                    <div>
                        <p class="underline">${marker.streetName}</p>
                    </div>
                        <div style='display: flex; flex-wrap: wrap;'>`

                let labels: [string] = marker.label;
                labels = labels.sort((a: string, b: string): number => a.localeCompare(b));

                labels.forEach((label: string) => {
                    const color: string = getColorForLabel(label);
                    popUpContent += `
                    <div class="pt-2 pb-2">
                    <div style="
                        background-color: ${color};
                        color: white;
                        padding: 4px 4px;
                        margin-right: 4px;
                        border-radius: 5px;
                        font-weight: bold;
                        cursor: pointer;
                        display: inline-block;
                        text-align: center;
                    ">${label} </div></div>
                    `
                });
                popUpContent += "</div>";
                popUpContent += `
                    <div>
                        <p>${marker.description}</p>
                    </div>
                `;

                if (marker.recommendation != undefined && marker.recommendation != "") {
                    popUpContent += `
                    <div>
                        <p>Empfehlung: ${marker.recommendation}</p>
                    </div>
                    `;
                }

                if (marker.images != undefined) {
                    popUpContent += `
                        <div>
                            <img src="${ImageUrl + marker.collectionId + "/" + marker.id + "/" + marker.images[0]}" alt="${marker.description}" 
                            style="max-width: 100%; height: auto; border-radius: 5px;"
                            class="mt-3"
                        </div>
                    `;
                }
                popUpContent += "</div>"

                const popup: Popup = new Popup({offset: 25, closeButton: false, maxWidth: "300px"})
                    .setHTML(popUpContent);

                const mapMarker: MapBoxMarker = new MapBoxMarker({color: getColorForMarkerLevel(marker.level)})
                    .setLngLat(switchLonLat([marker.longitude, marker.latitude]))
                    .setPopup(popup)
                    .addTo(map);

                const mapMarkerElement = mapMarker.getElement();
                mapMarkerElement.addEventListener("mouseenter", () => popup.addTo(map));
                mapMarkerElement.addEventListener("mouseleave", () => popup.remove());
            });
        });
    });

    // @ts-ignore
    return <div ref={mapContainer} style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        margin: "0 auto"
    }} class={"map-container"}></div>
}