import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { style } from "../../constrains";

export default function Analysis() {
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
          Density Distribution Analysis
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
            The density comparasion between multiple places during specific
            time.
          </p>
        </Typography>
      </CardContent>
    </Card>
  );
}
