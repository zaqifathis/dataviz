import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { MapboxLayer } from "@deck.gl/mapbox";
import { PathLayer } from "@deck.gl/layers";

import { getData, getRgbValue } from "./processMap";

mapboxgl.accessToken =
  "pk.eyJ1IjoiemFxaWZhdGhpcyIsImEiOiJjbDhka2p6eWQwczFyM29waG1wNXViZTE4In0.AYKKeWG34ik9VebsbZsd2A";

const geoData = getData();

export default function App(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-74.00644200339116);
  const [lat, setLat] = useState(40.71251869142519);
  const [zoom, setZoom] = useState(11.5);
  const [time, setTime] = useState(9);

  const pathLine = new MapboxLayer({
    id: "sidewalk_line",
    type: PathLayer,
    data: geoData,
    widthMinPixels: 2,
    getWidth: 3,
    getPath: (d) => d.geometry.coordinates[0],
    getColor: (d) => getRgbValue(d.properties[`p_total_${props.selectedTime}`]),
  });

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v9",
      // style: "mapbox://styles/mapbox/dark-v10?optimize=true",
      center: [lng, lat],
      zoom: zoom,
      maxPitch: 60,
      antialias: true,
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
      const firstLabelLayerId = map.current
        .getStyle()
        .layers.find(
          (layer) => layer.type === "symbol" && layer.layout["text-field"]
        ).id;

      map.current.addLayer(
        {
          id: "3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          // filter: [">", "height", 0],
          type: "fill-extrusion",
          minzoom: 15,
          paint: {
            "fill-extrusion-color": "#aaa",

            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
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
        firstLabelLayerId
      );

      //new layer
      map.current.addLayer(pathLine);
    });
  });

  useEffect(() => {
    if (!map.current) return;
    map.current.on("sourcedata", (e) => {
      console.log(e);
    });
  });
  // useEffect(() => {
  //   if (!map.current) return; // wait for map to initialize
  // setTime((prev) => props.selectedTime);

  //delete current layer and source
  // if (map.current.getLayer("sidewalk_line")) {
  //   map.current.removeLayer("sidewalk_line");
  // }
  // if (map.current.getSource("sidewalk_line")) {
  //   map.current.removeSource("sidewalk_line");
  // }

  // console.log("props:", props.selectedTime);
  // console.log("layer:", map.current.getStyle());
  //add layer
  // }, [props.selectedTime]);

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
