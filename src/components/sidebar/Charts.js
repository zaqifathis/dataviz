import React, { useState, useEffect } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";
import { getActiveData } from "../map/processMap";
import { colorStops } from "../../constrains";

const color = colorStops.color;

function Charts(props) {
  const [loc, setLoc] = useState("p_total_");
  const [time, setTime] = useState("19");
  const [activeProp, setActiveProp] = useState("p_total_19");
  const [data, setData] = useState([
    { name: "20", value: 105437 },
    { name: "40", value: 13516 },
    { name: "75", value: 9866 },
    { name: "100", value: 3141 },
    { name: "150", value: 5401 },
  ]);

  useEffect(() => {
    setTime(props.selectedTime);
    setActiveProp(loc + props.selectedTime);
  }, [props.selectedTime]);

  useEffect(() => {
    setLoc(props.selectedLoc);
    setActiveProp(props.selectedLoc + time);
  }, [props.selectedLoc]);

  useEffect(() => {
    const newData = getActiveData(activeProp);
    setData(newData);
  }, [activeProp]);

  return (
    <PieChart className="charts" width={500} height={500}>
      <Pie
        data={data}
        cx={100}
        cy={300}
        innerRadius={60}
        outerRadius={80}
        paddingAngle={3}
        dataKey="value"
      >
        {" "}
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={color[index % color.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}

export default Charts;
