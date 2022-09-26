import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { ScatterplotLayer, PathLayer } from "@deck.gl/layers";
import { MapboxLayer } from "@deck.gl/mapbox";
import getCoord from "./dataLayer";
import Deck from "deck.gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiemFxaWZhdGhpcyIsImEiOiJjbDhka2p6eWQwczFyM29waG1wNXViZTE4In0.AYKKeWG34ik9VebsbZsd2A";

export default function Mapp() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-73.95633079234533);
  const [lat, setLat] = useState(40.627794614478546);
  const [zoom, setZoom] = useState(11.5);
  // const [coords, setCoords] = useState([]);

  // useEffect(() => {
  //   const coord = getCoord();
  //   setCoords(coord);
  //   console.log(coord);
  // }, []);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [lng, lat],
      zoom: zoom,
      maxPitch: 60,
      projection: "equirectangular",
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    const deck = new Deck({
      gl: map.current.painter.context.gl,
      layers: [
        new ScatterplotLayer({
          id: "my-scatterplot",
          data: [{ position: [-74.5, 40], size: 15000 }],
          getPosition: (d) => d.position,
          getRadius: (d) => d.size,
          getFillColor: [255, 0, 0],
        }),
      ],
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
          id: "3d-buildings",
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

      map.current.addLayer(new MapboxLayer({ id: "my-scatterplot", deck }));
    });

    // map.current.addLayer(
    //   new MapboxLayer(
    //     {
    //       id: "circle-layer",
    //       type: ScatterplotLayer,
    //       data: [
    //         {
    //           position: [-73.95633079234533, 40.627794614478546],
    //           color: [255, 0, 0],
    //           radius: 1000,
    //         },
    //       ],
    //       getPosition: (d) => d.position,
    //       getFillColor: (d) => d.color,
    //       getRadius: (d) => d.radius,
    //       opacity: 0.1,
    //     },
    //     labelLayerId
    //   )
    // );

    // map.current.addLayer(
    //   new MapboxLayer({
    //     id: "path-layer",
    //     type: PathLayer,
    //     data: coords,
    //     widthScale: 100,
    //     widthMinPixels: 2,
    //     getPath: (d) => d,
    //     getColor: (d) => "rgba(98, 245, 214, 0.7)",
    //     getWidth: (d) => 50,
    //   })
    // );
    // });
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
