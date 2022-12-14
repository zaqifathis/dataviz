import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

import NYCSidewalkDensity_0 from "../../assets/NYCSidewalkDensity_0.json";
import NYCSidewalkDensity_1 from "../../assets/NYCSidewalkDensity_1.json";
import NYCSidewalkDensity_2 from "../../assets/NYCSidewalkDensity_2.json";
import SubwayLines from "../../assets/Subway Lines.geojson";
import SubwayStation from "../../assets/Subway Stations.geojson";
import { colorStops } from "../../constrains";

// eslint-disable-next-line import/no-webpack-loader-syntax
// mapboxgl.workerClass =
//   require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

mapboxgl.accessToken =
  "pk.eyJ1IjoiemFxaWZhdGhpcyIsImEiOiJjbDhka2p6eWQwczFyM29waG1wNXViZTE4In0.AYKKeWG34ik9VebsbZsd2A";

const lineWidth = 1.75;
const NYCdata = [
  NYCSidewalkDensity_0,
  NYCSidewalkDensity_1,
  NYCSidewalkDensity_2,
];

const layerHide = [
  "road-label-small",
  "road-label-medium",
  // "road-label-large",
  "place-city-sm",
  "place-city-md-s",
  "place-city-md-n",
  "place-city-lg-s",
  "place-city-lg-n",
  "place-town",
  // "place-neighbourhood",
  "poi-parks-scalerank1",
  "poi-parks-scalerank2",
  "poi-parks-scalerank3",
  "poi-scalerank1",
  "poi-scalerank2",
  "poi-scalerank3",
  "state-label-sm",
  "state-label-md",
  "state-label-lg",
];

const colorSteps = [
  [0, "rgba(19, 239, 250,0)"],
  [colorStops.step[0], colorStops.color[0]],
  [colorStops.step[1], colorStops.color[1]],
  [colorStops.step[2], colorStops.color[2]],
  [colorStops.step[3], colorStops.color[3]],
  [colorStops.step[4], colorStops.color[4]],
];

export default function Mapp(props) {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [activeProp, setActiveProp] = useState(["subw_19"]);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v9",
      center: [-73.98997408518673, 40.70261932678772],
      zoom: 12,
      bearing: -30,
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

      //hide text layer
      for (let i = 0; i < layerHide.length; i++) {
        map.setLayoutProperty(layerHide[i], "visibility", "none");
      }
      //reduce text opacity
      map.setPaintProperty("place-neighbourhood", "text-opacity", 0.7);
      map.setPaintProperty("road-label-large", "text-opacity", 0.7);

      //sidewalk layer
      for (let i = 0; i < NYCdata.length; i++) {
        const data = getSumPedestrian(activeProp, NYCdata[i].features);

        //add source
        map.addSource(`sidewalk${i}`, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: data,
          },
        });

        map.addLayer(
          {
            id: `sidewalk${i}`,
            type: "line",
            source: `sidewalk${i}`,
          },
          firstLabelLayerId
        );

        map.setPaintProperty(`sidewalk${i}`, "line-color", {
          property: "sumLayer",
          stops: colorSteps,
        });

        map.setPaintProperty(`sidewalk${i}`, "line-width", lineWidth);
      }

      //subway layer
      //subway line
      map.addSource("subwayLines", {
        type: "geojson",
        data: SubwayLines,
      });
      map.addLayer(
        {
          id: "subwayLines",
          type: "line",
          source: "subwayLines",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "rgba(234, 246, 49, 0.2)",
            "line-width": 2,
          },
        },
        firstLabelLayerId
      );

      //subway station
      map.addSource("subwayStation", {
        type: "geojson",
        data: SubwayStation,
      });
      map.addLayer(
        {
          id: "subwayStation",
          type: "circle",
          source: "subwayStation",
          paint: {
            "circle-radius": {
              base: 3,
              stops: [
                [12, 3.5],
                [22, 150],
              ],
            },
            "circle-color": "rgba(234, 246, 49, 0.5)",
          },
        },
        firstLabelLayerId
      );
      map.setLayoutProperty("subwayLines", "visibility", "visible");
      map.setLayoutProperty("subwayStation", "visibility", "visible");

      setMap(map);
    });
  }, []);

  useEffect(() => {
    if (!map) return;
    setActiveProp(props.activeLayers);
  }, [props.activeLayers]);

  // useEffect(() => {
  //   if (!map) return;
  //   setLoc(props.selectedLoc);
  //   setActiveProp(props.selectedLoc + time);

  //   //check layer
  //   if (props.selectedLoc === "subw_") {
  //     map.setLayoutProperty("subwayLines", "visibility", "visible");
  //     map.setLayoutProperty("subwayStation", "visibility", "visible");
  //   } else {
  //     map.setLayoutProperty("subwayLines", "visibility", "none");
  //     map.setLayoutProperty("subwayStation", "visibility", "none");
  //   }
  // }, [props.selectedLoc]);

  useEffect(() => {
    paint();
  }, [activeProp]);

  const paint = () => {
    if (map) {
      for (let i = 0; i < NYCdata.length; i++) {
        const data = getSumPedestrian(activeProp, NYCdata[i].features);
        map.getSource(`sidewalk${i}`).setData({
          type: "FeatureCollection",
          features: data,
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

function getSumPedestrian(layers, data) {
  const result = [];

  for (let i = 0; i < data.length; i++) {
    const obj = {};
    const temp = getLayerData(layers, data[i].properties);
    obj.type = data[i].type;
    obj.geometry = data[i].geometry;
    obj.properties = temp;

    result.push(obj);
  }
  return result;
}

function getLayerData(layers, properties) {
  //should return object
  const temp = [];
  for (let i = 0; i < layers.length; i++) {
    temp.push(properties[layers[i]]);
  }
  return {
    sumLayer: temp.reduce((a, b) => a + b, 0),
  };
}
