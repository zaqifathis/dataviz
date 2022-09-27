import React from "react";
import axios from "axios";

function GetMapGeojson() {
  //get URL data
  const getData = () => {
    axios
      .get(
        "https://datavizzaqi.s3.ap-northeast-1.amazonaws.com/NYC_COVID_Sidewalk_Density_WGS84.geojson"
      )
      .then((res) => {
        console.log("ok!");
      })
      .catch((err) => {
        console.log("error!!");
      });
  };

  return <div>{getData()}</div>;
}

export default GetMapGeojson;
