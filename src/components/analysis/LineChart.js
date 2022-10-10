import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { getActiveData } from "./processMap";

const filter = {
  p_total_: "total",
  subw_: "subway",
  offi_: "office",
  bank_: "bank",
  rest_: "restaurant",
  phar_: "pharmacy",
  supe_: "supermarket",
};
export const filterColor = {
  p_total_: "#f20fd8",
  subw_: "#0ff29f",
  offi_: "#00E1EB",
  bank_: "#0f16f2",
  rest_: "#F95542",
  phar_: "#EF4D98",
  supe_: "#F9BFB2",
};

function LineCharts(props) {
  const data = getActiveData(props.activeLayers, props.location);
  const locColor = getListloc(props.location);

  return (
    <LineChart
      className="charts"
      width={350}
      height={200}
      data={data}
      margin={{
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />

      {locColor.map((item) => (
        <Line
          type="monotone"
          dataKey={item.name}
          stroke={item.color}
          activeDot={{ r: 6.5 }}
        />
      ))}
    </LineChart>
  );
}

export default LineCharts;

function getListloc(locations) {
  const listLocs = [];

  for (let i = 0; i < locations.length; i++) {
    const temp = {};
    temp.name = filter[locations[i]];
    temp.color = filterColor[locations[i]];
    listLocs.push(temp);
  }

  return listLocs;
}
