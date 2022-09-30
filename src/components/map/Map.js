import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

import { urls } from "./processMap";

const removeLayerandSource = (map, item) => {
  const mapLayer = map.current.getLayer(item);
  if (typeof mapLayer !== "undefined") {
    map.current.removeLayer(item);
  }
  const mapSource = map.current.getSource(item);
  if (typeof mapSource !== "undefined") {
    map.current.removeSource(item);
  }
};

mapboxgl.accessToken =
  "pk.eyJ1IjoiemFxaWZhdGhpcyIsImEiOiJjbDhka2p6eWQwczFyM29waG1wNXViZTE4In0.AYKKeWG34ik9VebsbZsd2A";

export default function Mapp(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-74.00644200339116);
  const [lat, setLat] = useState(40.71251869142519);
  const [zoom, setZoom] = useState(11.5);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10?optimize=true",
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
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize

    map.current.on("load", () => {
      // Insert the layer beneath any symbol layer.
      const layers = map.current.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === "symbol" && layer.layout["text-field"]
      ).id;

      for (let i = 0; i < urls.length; i++) {
        map.current.addSource("sidewalk" + i, {
          type: "geojson",
          data: urls[i],
        });

        map.current.addLayer({
          id: "sidewalk" + i,
          type: "line",
          source: "sidewalk" + i,
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "yellow",
            "line-width": 1.5,
          },
        });
      }

      // The 'building' layer in the Mapbox Streets
      map.current.addLayer(
        {
          id: "add-3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 15,
          paint: {
            "fill-extrusion-color": "rgba(255, 255, 255, 0.5)",

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
            "fill-extrusion-opacity": 0.5,
          },
        },
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
