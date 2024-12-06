import mapboxgl from "mapbox-gl";
import {Map} from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {onMount} from "solid-js";
import {switchLonLat} from "../util/LatConverter";
import "../data/Pocketbase";
import {fetchMarkers, getColorForLabel, getColorForMarkerLevel, ImageUrl} from "../data/Pocketbase";

export default function MapComponent() {
    let mapContainer: string | HTMLElement;
    onMount(async () => {
        mapboxgl.accessToken = "pk.eyJ1IjoiYW1yYWxldGgiLCJhIjoiY20zc2g3d3NmMGZvNjJxcXZta3p6MGtneSJ9.ArplgD8cpuY3yrbOTZwgBw";

        //TODO: different locations
        const center = switchLonLat([52.47451265096441, 10.349770457268184]);
        const markers = await fetchMarkers();

        const map = new Map({
            // @ts-ignore
            container: mapContainer,
            center: center,
            zoom: 15,
            style: "mapbox://styles/mapbox/satellite-streets-v12"
        });

        map.on("load", () => {
            markers.forEach((marker) => {

                let popUpContent = `
                <div>
                    <div>
                        <p class='text-lg font-bold'>${marker.name}</p>
                    </div>
                    <div>
                        <p class="underline">${marker.streetName}</p>
                    </div>
                    
                        <div style='display: flex; flex-wrap: wrap;'>`

                let labels = marker.label;
                labels = labels.sort((a, b) => a.localeCompare(b));

                labels.forEach((label) => {
                    const color = getColorForLabel(label);
                    popUpContent += `
                    <div style="
                        background-color: ${color};
                        color: white;
                        padding: 4px;
                        margin-top: 5px;
                        margin-right: 10px;
                        margin-bottom: 5px;
                        border-radius: 5px;
                        font-weight: bold;
                        cursor: pointer;
                        display: inline-block;
                        text-align: center;
                    ">${label} </div>
                    `
                });
                popUpContent += "</div>";
                popUpContent += `
                    <div>
                        <p>${marker.description}</p>
                    </div>
                `;

                if (marker.images != undefined) {
                    popUpContent += `
                        <div>
                            <img src="${ImageUrl + marker.id + "/" + marker.images[0]}" alt="${marker.description}" 
                            style="max-width: 100%; height: auto; border-radius: 5px;"
                            class="mt-3"
                        </div>
                    `;
                }
                popUpContent += "</div>"

                const popup = new mapboxgl.Popup({offset: 25, closeButton: false})
                    .setHTML(popUpContent);

                const mapMarker = new mapboxgl.Marker({color: getColorForMarkerLevel(marker.level)})
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