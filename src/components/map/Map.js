import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

import { getData, getRgbValue } from "./processMap";
import NYCSidewalkDensity_0 from "../../assets/NYCSidewalkDensity_0.json";
import NYCSidewalkDensity_1 from "../../assets/NYCSidewalkDensity_1.json";
import NYCSidewalkDensity_2 from "../../assets/NYCSidewalkDensity_2.json";

mapboxgl.accessToken =
  "pk.eyJ1IjoiemFxaWZhdGhpcyIsImEiOiJjbDhka2p6eWQwczFyM29waG1wNXViZTE4In0.AYKKeWG34ik9VebsbZsd2A";

const geoData = getData();
const lineWidth = 1.75;
const NYCdata = [
  NYCSidewalkDensity_0,
  NYCSidewalkDensity_1,
  NYCSidewalkDensity_2,
];

const layerHide = [
  "road-label-small",
  "road-label-medium",
  "place-city-sm",
  "place-city-md-s",
  "place-city-md-n",
  "place-city-lg-s",
  "place-city-lg-n",
  "place-town",
  // "poi-scalerank1",
  "poi-scalerank2",
  "poi-scalerank3",
];

const colorSteps = [
  [0, "rgba(19, 239, 250,0)"],
  [20, "rgb(19, 113, 250)"],
  [40, "rgb(40, 19, 250)"],
  [75, "rgb(159, 19, 250)"],
  [100, "rgb(250, 19, 194)"],
  [150, "rgb(250, 19, 75)"],
];

export default function Mapp(props) {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [loc, setLoc] = useState("p_total_");
  const [time, setTime] = useState("19");
  const [activeProp, setActiveProp] = useState("p_total_19");

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v9",
      center: [-74.00644200339116, 40.71251869142519],
      zoom: 11.5,
      maxPitch: 60,
      antialias: true,
    });

    map.on("load", () => {
      const firstLabelLayerId = map
        .getStyle()
        .layers.find(
          (layer) => layer.type === "symbol" && layer.layout["text-field"]
        ).id;

      map.addLayer(
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
            "fill-extrusion-opacity": 0.4,
          },
        },
        firstLabelLayerId
      );

      for (let i = 0; i < layerHide.length; i++) {
        map.setLayoutProperty(layerHide[i], "visibility", "none");
      }

      for (let i = 0; i < NYCdata.length; i++) {
        //add source
        map.addSource(`sidewalk${i}`, {
          type: "geojson",
          data: NYCdata[i],
        });

        //add layer
        map.addLayer(
          {
            id: `sidewalk${i}`,
            type: "line",
            source: `sidewalk${i}`,
          },
          firstLabelLayerId
        );

        map.setPaintProperty(`sidewalk${i}`, "line-color", {
          property: activeProp,
          stops: colorSteps,
        });

        map.setPaintProperty(`sidewalk${i}`, "line-width", lineWidth);
      }
      setMap(map);
    });
  }, []);

  useEffect(() => {
    setTime(props.selectedTime);
    setActiveProp(loc + props.selectedTime);
  }, [props.selectedTime]);

  useEffect(() => {
    setLoc(props.selectedLoc);
    setActiveProp(props.selectedLoc + time);
  }, [props.selectedLoc]);

  useEffect(() => {
    paint();
    console.log("activeprop is::", activeProp);
    // console.log(map.getStyle());
  }, [activeProp]);

  const paint = () => {
    if (map) {
      for (let i = 0; i < NYCdata.length; i++) {
        map.setPaintProperty(`sidewalk${i}`, "line-color", {
          property: activeProp,
          stops: colorSteps,
        });
      }
    }
  };

  return (
    <div>
      <div ref={mapContainerRef} className="map-container" />
    </div>
  );
}
