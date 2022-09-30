import axios from "axios";

//should use url
export const urls = [
  "https://datavizzaqi.s3.ap-northeast-1.amazonaws.com/data_chunck_sidewalk_density/NYCSidewalkDensity_xaaaa.json",
  "https://datavizzaqi.s3.ap-northeast-1.amazonaws.com/data_chunck_sidewalk_density/NYCSidewalkDensity_xaaab.json",
  "https://datavizzaqi.s3.ap-northeast-1.amazonaws.com/data_chunck_sidewalk_density/NYCSidewalkDensity_xaaac.json",
];

function getSplitData(featureData) {
  const coordData = [];
  const propertiesData = [];
  for (let i = 0; i < featureData.length; i++) {
    coordData.push(featureData[i].geometry.coordinates);
    propertiesData.push(featureData[i].properties);
  }
  return { coordData, propertiesData };
}

export function getData() {
  const featureData = [];

  for (let i = 0; i < urls.length; i++) {
    const data = require("../../assets/NYCSidewalkDensity_" + i + ".json");
    featureData.push(data.features);
  }

  const merged = [].concat.apply([], featureData);
  const geoJsonData = getSplitData(merged);
  return geoJsonData;
}
