import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";
import { style } from "../../constrains";
import { getActiveData } from "../map/processMap";
import { colorStops } from "../../constrains";
import { PieChart, Pie, Sector, Cell } from "recharts";

const color = colorStops.color;

const useStyles = makeStyles({
  root: {
    width: 400,
    height: 750,
    zIndex: 1,
    bottom: 0,
    position: style.position,
    background: style.background,
    padding: "10px 20px",
    borderRadius: style.borderRadius,
    margin: "0 0 30px 0",
    backdropFilter: style.backdropFilter,
  },
  text: {
    color: style.color,
    fontWeight: "lighter",
    fontSize: "18px",
    marginBottom: 5,
  },
  text2: {
    color: "rgba(191, 192, 192, 0.8)",
    fontSize: "13px",
  },
});

function Analysis(props) {
  const classes = useStyles();
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
  const [percentage, setPercentage] = useState([]);

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
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.text} variant="h6">
            Sidewalk distribution
          </Typography>
        </CardContent>
      </Card>

      <PieChart className="charts" width={500} height={500}>
        <Pie
          data={data}
          cx={110}
          cy={350}
          innerRadius={50}
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
    </div>
  );
}

export default Analysis;
