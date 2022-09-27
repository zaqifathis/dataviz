import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { ScatterplotLayer, PathLayer } from "@deck.gl/layers";
import { MapboxLayer } from "@deck.gl/mapbox";
import getCoord from "./dataLayer";

mapboxgl.accessToken =
  "pk.eyJ1IjoiemFxaWZhdGhpcyIsImEiOiJjbDhka2p6eWQwczFyM29waG1wNXViZTE4In0.AYKKeWG34ik9VebsbZsd2A";

export default function Mapp() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-74.00644200339116);
  const [lat, setLat] = useState(40.71251869142519);
  const [zoom, setZoom] = useState(11.5);

  useEffect(() => {
    const test = getCoord();
  }, []);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [lng, lat],
      zoom: zoom,
      maxPitch: 60,
      projection: "mercator",
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on("load", () => {
      // Insert the layer beneath any symbol layer.
      const layers = map.current.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === "symbol" && layer.layout["text-field"]
      ).id;

      // The 'building' layer in the Mapbox Streets
      // vector tileset contains building height data
      // from OpenStreetMap.
      map.current.addLayer(
        {
          id: "add-3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 15,
          paint: {
            "fill-extrusion-color": "#aaa",

            // Use an 'interpolate' expression to
            // add a smooth transition effect to
            // the buildings as the user zooms in.
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "height"],
            ],
            "fill-extrusion-base": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "min_height"],
            ],
            "fill-extrusion-opacity": 0.6,
          },
        },
        labelLayerId
      );

      map.current.addLayer(
        new MapboxLayer({
          id: "deckgl-circle",
          type: ScatterplotLayer,
          data: [
            {
              position: [-73.87216696989826, 40.77362909683373],
              color: [255, 0, 0],
              radius: 5000,
            },
          ],
          getPosition: (d) => d.position,
          getFillColor: (d) => d.color,
          getRadius: (d) => d.radius,
          opacity: 0.1,
        }),
        labelLayerId
      );

      map.current.addLayer(
        new MapboxLayer({
          id: "deckgl-circle2",
          type: ScatterplotLayer,
          data: [
            {
              position: [-73.99278505793139, 40.7029772346569],
              color: [255, 0, 0],
              radius: 2000,
            },
          ],
          getPosition: (d) => d.position,
          getFillColor: (d) => d.color,
          getRadius: (d) => d.radius,
          opacity: 0.1,
        }),
        labelLayerId
      );

      map.current.addLayer(
        new MapboxLayer({
          id: "deckgl-path",
          type: PathLayer,
          data: [
            {
              path: [
                [-73.87216696989826, 40.77362909683373],
                [-73.99278505793139, 40.7029772346569],
              ],
              color: [255, 255, 0],
            },
          ],
          pickable: true,
          widthScale: 1,
          widthMinPixels: 2,
          opacity: 0.4,
          getPath: (d) => d.path,
          getColor: (d) => d.color,
          getWidth: (d) => 5,
        }),
        labelLayerId
      );
    });
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
