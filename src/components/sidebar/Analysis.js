import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";
import { style } from "../../constrains";

const useStyles = makeStyles({
  root: {
    width: 400,
    height: 500,
    zIndex: 1,
    position: style.position,
    background: style.background,
    padding: "10px 20px",
    borderRadius: style.borderRadius,
    margin: "180px 0 0 0",
    backdropFilter: style.backdropFilter,
  },
});

function Analysis() {
  const classes = useStyles();

  return <Card className={classes.root}></Card>;
}

export default Analysis;
