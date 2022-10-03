import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { MapboxLayer } from "@deck.gl/mapbox";
import { PathLayer } from "@deck.gl/layers";

import { getData, getRgbValue } from "./processMap";
import NYCSidewalkDensity_0 from "../../assets/NYCSidewalkDensity_0.json";
import NYCSidewalkDensity_1 from "../../assets/NYCSidewalkDensity_1.json";
import NYCSidewalkDensity_2 from "../../assets/NYCSidewalkDensity_2.json";

mapboxgl.accessToken =
  "pk.eyJ1IjoiemFxaWZhdGhpcyIsImEiOiJjbDhka2p6eWQwczFyM29waG1wNXViZTE4In0.AYKKeWG34ik9VebsbZsd2A";

const geoData = getData();

export default function Mapp(props) {
  const option = [
    {
      property: "p_total_9",
      stops: [
        [0, "rgb(19, 239, 250)"],
        [20, "rgb(19, 113, 250)"],
        [40, "rgb(40, 19, 250)"],
        [75, "rgb(159, 19, 250)"],
        [100, "rgb(250, 19, 194)"],
        [150, "rgb(250, 19, 75)"],
      ],
    },
    {
      property: "p_total_12",
      stops: [
        [0, "rgb(19, 239, 250)"],
        [20, "rgb(19, 113, 250)"],
        [40, "rgb(40, 19, 250)"],
        [75, "rgb(159, 19, 250)"],
        [100, "rgb(250, 19, 194)"],
        [150, "rgb(250, 19, 75)"],
      ],
    },
    {
      property: "p_total_19",
      stops: [
        [0, "rgb(19, 239, 250)"],
        [20, "rgb(19, 113, 250)"],
        [40, "rgb(40, 19, 250)"],
        [75, "rgb(159, 19, 250)"],
        [100, "rgb(250, 19, 194)"],
        [150, "rgb(250, 19, 75)"],
      ],
    },
  ];

  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [active, setActive] = useState(option[2]);

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
            "fill-extrusion-opacity": 0.6,
          },
        },
        firstLabelLayerId
      );

      map.addSource("sidewalk0", {
        type: "geojson",
        data: NYCSidewalkDensity_0,
      });

      map.addSource("sidewalk1", {
        type: "geojson",
        data: NYCSidewalkDensity_1,
      });

      map.addSource("sidewalk2", {
        type: "geojson",
        data: NYCSidewalkDensity_2,
      });

      //layer1
      map.addLayer(
        {
          id: "sidewalk0",
          type: "line",
          source: "sidewalk0",
        },
        firstLabelLayerId
      );

      map.setPaintProperty("sidewalk0", "line-color", {
        property: active.property,
        stops: active.stops,
      });

      //layer2
      map.addLayer(
        {
          id: "sidewalk1",
          type: "line",
          source: "sidewalk1",
        },
        firstLabelLayerId
      );

      map.setPaintProperty("sidewalk1", "line-color", {
        property: active.property,
        stops: active.stops,
      });

      //layer3
      map.addLayer(
        {
          id: "sidewalk2",
          type: "line",
          source: "sidewalk2",
        },
        firstLabelLayerId
      );

      map.setPaintProperty("sidewalk2", "line-color", {
        property: active.property,
        stops: active.stops,
      });

      setMap(map);
    });

    // Clean up on unmount
    // return () => map.remove();
  }, []);

  useEffect(() => {
    //update the active useState
    setActive(props);
    paint();
  }, [props]);

  useEffect(() => {
    paint();
  }, [active]);

  const paint = () => {
    if (map) {
      map.setPaintProperty("sidewalk0", "line-color", {
        property: active.property,
        stops: active.stops,
      });
      map.setPaintProperty("sidewalk1", "line-color", {
        property: active.property,
        stops: active.stops,
      });
    }
  };

  return (
    <div>
      <div ref={mapContainerRef} className="map-container" />
    </div>
  );
}
