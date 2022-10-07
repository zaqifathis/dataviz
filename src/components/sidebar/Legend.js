import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { style, colorStops } from "../../constrains";

export default function Analysis() {
  return (
    <Card
      style={{
        background: style.background,
        backdropFilter: "blur(2px)",
        width: 400,
        height: 120,
        zIndex: 1,
        color: style.color,
        left: 20,
        top: 200,
        // top: 710,
        position: "absolute",
      }}
    >
      <CardContent>
        <Typography
          style={{
            fontSize: "13px",
          }}
          variant="body2"
          color={"rgba(191, 192, 192, 0.8)"}
          component="div"
        >
          Sidewalk coloured by total estimated pedestrian
        </Typography>
      </CardContent>
      <Card
        style={{
          background: `linear-gradient(to right, ${colorStops.color[0]}, ${colorStops.color[1]}, ${colorStops.color[2]}, ${colorStops.color[3]},${colorStops.color[4]} )`,
          backdropFilter: "blur(2px)",
          width: 350,
          height: 20,
          zIndex: 2,
          color: style.color,
          left: 20,
          position: "absolute",
        }}
      ></Card>
      <Typography
        style={{
          fontSize: "13px",
          margin: "25px 0 0 20px",
          wordSpacing: 60,
        }}
        variant="body2"
        color={"rgba(191, 192, 192, 0.8)"}
        component="div"
      >
        20 40 75 100 150<span>&#60;</span>
      </Typography>
    </Card>
  );
}
