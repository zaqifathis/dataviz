// import axios from "axios";

//should use url
export const urls = [
  "https://datavizzaqi.s3.ap-northeast-1.amazonaws.com/data_chunck_sidewalk_density/NYCSidewalkDensity_xaaaa.json",
  "https://datavizzaqi.s3.ap-northeast-1.amazonaws.com/data_chunck_sidewalk_density/NYCSidewalkDensity_xaaab.json",
  "https://datavizzaqi.s3.ap-northeast-1.amazonaws.com/data_chunck_sidewalk_density/NYCSidewalkDensity_xaaac.json",
];

export function getData() {
  const featureData = [];
  const total = [];

  for (let i = 0; i < 3; i++) {
    const data = require("../../assets/NYCSidewalkDensity_" + i + ".json");
    featureData.push(data.features);
  }
  const merged = [].concat.apply([], featureData);
  merged.forEach((item) => {
    total.push(item.properties.p_total_19);
  });
  // console.log("merge::", merged);

  return merged;
}

export function getRgbValue(val) {
  const num = val > 100 ? 100 : val;
  const remapNum = remap(num, 0, 100, 185, 330);
  const rgb = hsl2rgb(remapNum, 100, 45);
  return rgb;
}

function remap(value, sourceMin, sourceMax, destMin, destMax) {
  return (
    destMin +
    ((value - sourceMin) / (sourceMax - sourceMin)) * (destMax - destMin)
  );
}

function hsl2rgb(h, s, l) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
}
