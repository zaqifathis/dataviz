import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { ScatterplotLayer, PathLayer, LineLayer } from "@deck.gl/layers";
import { MapboxLayer } from "@deck.gl/mapbox";
import { getData } from "./processMap";

mapboxgl.accessToken =
  "pk.eyJ1IjoiemFxaWZhdGhpcyIsImEiOiJjbDhka2p6eWQwczFyM29waG1wNXViZTE4In0.AYKKeWG34ik9VebsbZsd2A";

export default function Mapp(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-74.00644200339116);
  const [lat, setLat] = useState(40.71251869142519);
  const [zoom, setZoom] = useState(11.5);
  const [coordinate, setCoordinate] = useState();
  const [properties, setProperties] = useState();

  useEffect(() => {
    const data = getData();
    setCoordinate(data.coordData);
    setProperties(data.propertiesData);
    console.log(data);
  }, []);

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

    map.current.on("load", () => {
      // Insert the layer beneath any symbol layer.
      const layers = map.current.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === "symbol" && layer.layout["text-field"]
      ).id;

      map.current.addSource("sidewalk", {
        type: "geojson",
        data: "https://datavizzaqi.s3.ap-northeast-1.amazonaws.com/data_chunck_sidewalk_density/NYCSidewalkDensity_xaaaa.geojson",
      });

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

      map.current.addLayer(
        {
          id: "sidewalk-layer",
          type: "line",
          source: "sidewalk",
          visibility: "visible",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "yellow",
            "line-width": 3,
          },
        },
        labelLayerId
      );

      // // sidewalk layer
      // // map.current.removeLayer("sdwlk1").removeSource("sdwlk1");
      // if (!map.current.getLayer("sidewalklayer")) {
      //   map.current.addLayer(
      //     new MapboxLayer({
      //       id: "sdwlk1",
      //       type: LineLayer,
      //       data: [
      //         [-73.87216696989826, 40.77362909683373],
      //         [-73.99278505793139, 40.7029772346569],
      //       ],
      //       getPosition: (d) => d,
      //       getFillColor: [255, 255, 0],
      //       getWidth: 5,
      //       widthMinPixels: 2,
      //       opacity: 0.1,
      //     }),
      //     labelLayerId
      //   );
      // }

      map.current.addLayer(
        new MapboxLayer({
          id: "deckgl-circle",
          type: ScatterplotLayer,
          data: [
            {
              position: [-73.87216696989826, 40.77362909683373],
              color: [255, 0, 0],
              radius: 500,
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
              radius: 500,
            },
          ],
          getPosition: (d) => d.position,
          getFillColor: (d) => d.color,
          getRadius: (d) => d.radius,
          opacity: 0.1,
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
