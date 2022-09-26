import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 400,
    height: 700,
    zIndex: 1,
    position: "absolute",
    background: "rgba(9, 17, 18, 0.65)",
    padding: "10px 20px",
    borderRadius: "15px",
    margin: "220px 0 0 0",
    backdropFilter: "blur(2px)",
  },
});

export default function Analysis() {
  const classes = useStyles();
  return <Card className={classes.root}></Card>;
}
