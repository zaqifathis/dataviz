import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { style } from "../../constrains";

export default function Description() {
  return (
    <Card
      style={{
        background: style.background,
        backdropFilter: "blur(2px)",
        width: 400,
        height: 170,
        zIndex: 1,
        color: style.color,
        left: 0,
        top: 0,
        margin: " 20px 0 0 20px",
        position: "absolute",
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div">
          NYC COVID SIDEWALK DENSITY
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
            NYC Sidewalk density explores the relationship between pedestrian
            and the building program during covid time and how it affects the
            transmission of the covid-19. The color represents the total
            estimated pedestrian on each sidewalk.
          </p>
        </Typography>
      </CardContent>
    </Card>
  );
}
