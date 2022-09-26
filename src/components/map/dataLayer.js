export default function getCoord() {
  const data = require("../../mapData/NYC_COVID_Sidewalk_Density_Test.json");
  const features = data.features.map((f) => f.geometry.coordinates[0]);

  return features;
}
