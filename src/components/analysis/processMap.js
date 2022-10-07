import { colorStops } from "../../constrains";

//should use url
// export const urls = [
//   "https://datavizzaqi.s3.ap-northeast-1.amazonaws.com/data_chunck_sidewalk_density/NYCSidewalkDensity_xaaaa.json",
//   "https://datavizzaqi.s3.ap-northeast-1.amazonaws.com/data_chunck_sidewalk_density/NYCSidewalkDensity_xaaab.json",
//   "https://datavizzaqi.s3.ap-northeast-1.amazonaws.com/data_chunck_sidewalk_density/NYCSidewalkDensity_xaaac.json",
// ];

const filter = {
  p_total_: "total",
  subw_: "subway",
  offi_: "office",
  bank_: "bank",
  rest_: "restaurant",
  phar_: "pharmacy",
  supe_: "supermarket",
};

export function getActiveData(activeLayers, locations) {
  const list = [];
  for (let i = 0; i < colorStops.step.length; i++) {
    const step = colorStops.step[i];
    const temp = {};
    temp.name = `${step}`;

    locations.forEach((loc) => {
      const locname = filter[loc];
      temp[locname] = 0;
    });
    list.push(temp);
  }
  let test = 0;
  const featureData = getJsonData();
  for (let i = 0; i < featureData.length; i++) {
    for (let j = 0; j < activeLayers.length; j++) {
      const item = featureData[i].properties[activeLayers[j]];
      const locname = filter[locations[j]];
      if (item > 100) test += 1;
      dataClustering(item, locname, list);
    }
  }
  return list;
}

function dataClustering(item, locname, list) {
  //list [{20},{40},{75},{100}, {150}]
  const steps = colorStops.step;

  if (5 < item && item <= steps[0]) {
    // >20
    list[0][locname] += 1;
    return;
  }
  if (steps[0] < item && item <= steps[1]) {
    //20 -40
    list[1][locname] += 1;
    return;
  }
  if (steps[1] < item && item <= steps[2]) {
    //40-75
    list[2][locname] += 1;
    return;
  }
  if (steps[2] < item && item <= steps[3]) {
    //75 - 100
    list[3][locname] += 1;
    return;
  }
  if (steps[3] < item) {
    //100<
    list[4][locname] += 1;
    return;
  }
}

export function getJsonData() {
  const featureData = [];

  for (let i = 0; i < 3; i++) {
    const data = require(`../../assets/NYCSidewalkDensity_${i}.json`);
    featureData.push(data.features);
  }
  const merged = [].concat.apply([], featureData);
  return merged;
}

//hsl to rgb value
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
