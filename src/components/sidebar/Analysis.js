import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { style } from "../../constrains";

import { filterColor } from "../analysis/LineChart";

const legendText = [
  { color: "p_total_", name: "Total estimated pedestrian" },
  { color: "subw_", name: "Estimated pedestrian queueing the Subway" },
  { color: "offi_", name: "Estimated pedestrian queueing the Office" },
  { color: "bank_", name: "Estimated pedestrian queueing the Bank" },
  { color: "rest_", name: "Estimated pedestrian queueing the Restaurant" },
  { color: "phar_", name: "Estimated pedestrian queueing the Pharmacy" },
  {
    color: "supe_",
    name: "Estimated pedestrian queueing the Supermarket",
  },
];

export default function Analysis() {
  const legendDetails = legendText.map((item) => (
    <React.Fragment>
      <Typography
        style={{
          fontSize: "13px",
          // lineHeight: "5px",
          margin: "0 0 0 50px",
        }}
        variant="body2"
        color={"rgba(191, 192, 192, 0.8)"}
        component="div"
      >
        {item.name}
      </Typography>
      <Card
        style={{
          background: `${filterColor[item.color]}`,
          width: 15,
          height: 15,
          zIndex: 2,
          margin: "-17px 0 0 20px",
          position: "absolute",
        }}
      ></Card>
    </React.Fragment>
  ));

  return (
    <Card
      style={{
        background: style.background,
        backdropFilter: "blur(2px)",
        width: 400,
        height: 600,
        zIndex: 1,
        color: style.color,
        left: 20,
        top: 330,
        position: "absolute",
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div">
          Density Analysis
        </Typography>
        <Typography
          style={{
            fontSize: "13px",
          }}
          variant="body2"
          color={"rgba(191, 192, 192, 0.8)"}
          component="div"
        >
          <p>
            Comparasion of the total sidewalk density between multiple places.
            Add one or more filters to see the comparasion.
          </p>
        </Typography>
        <Typography
          style={{
            fontSize: "13px",
            margin: "290px 0 0 0",
            paddingBottom: "0.5px",
          }}
          variant="body2"
          color={style.color}
          component="div"
        >
          <p>Graph Legend</p>
        </Typography>
        {legendDetails}
      </CardContent>
    </Card>
  );
}
