import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";
import { style } from "../../constrains";

const useStyles = makeStyles({
  root: {
    width: 400,
    height: 170,
    zIndex: 1,
    position: style.position,
    background: style.background,
    padding: "0px 20px",
    margin: "10px 0 0 0",
    borderRadius: style.borderRadius,
    backdropFilter: style.backdropFilter,
  },
  text: {
    color: style.color,
    padding: "0 0 5px 0",
  },
  pos: {
    marginBottom: 5,
    color: "rgba(191, 192, 192, 0.8)",
    fontSize: "13px",
  },
});

export default function Description() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.text} variant="h6">
          NYC COVID SIDEWALK DENSITY
        </Typography>
        <Typography className={classes.pos} variant="body2" gutterBottom>
          <p>
            The visualization of NYC sidewalk density during covid time. The map
            is categorized by time and location.
          </p>{" "}
          Data:
        </Typography>
      </CardContent>
    </Card>
  );
}
