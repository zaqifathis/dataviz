import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";
import { style } from "../../constrains";

import { colorStops } from "../../constrains";

const useStyles = makeStyles({
  root: {
    width: 300,
    height: 135,
    zIndex: 1,
    bottom: 0,
    right: 0,
    padding: "0 0 0 0",
    margin: "0 10px 30px 0",
    position: style.position,
    background: style.background,
    borderRadius: style.borderRadius,
    backdropFilter: style.backdropFilter,
  },
  legend: {
    width: 270,
    height: 20,
    zIndex: 2,
    position: style.position,
    background:
      "linear-gradient(to right, rgb(19, 113, 250), rgb(40, 19, 250), rgb(159, 19, 250), rgb(250, 19, 194), rgb(250, 19, 75))",
    opacity: 0.65,
    borderRadius: style.borderRadius,
    backdropFilter: style.backdropFilter,
    margin: "0 15px 35px 0",
    padding: "0 0 0 0",
    bottom: 0,
    right: 0,
  },
  title: {
    fontWeight: "lighter",
    color: style.color,
    padding: "0 0 0 0",
  },
  text: {
    color: "rgba(191, 192, 192, 0.8)",
    fontSize: "12px",
  },
  legendtext: {
    color: "rgba(191, 192, 192, 0.8)",
    fontSize: "12px",
    margin: "15px 0 0 0",
    wordSpacing: 220,
  },
});

export default function Legend() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} variant="h6">
          Map Legend
        </Typography>
        <Typography className={classes.text} variant="body2" gutterBottom>
          Sidewalk coloured by total estimated pedestrian
        </Typography>
        <Card className={classes.legend}></Card>;
        <Typography className={classes.legendtext} variant="body2" gutterBottom>
          {colorStops.step[0]} <span>&#62;</span>
          {colorStops.step[colorStops.step.length - 1]}
        </Typography>
      </CardContent>
    </Card>
  );
}
