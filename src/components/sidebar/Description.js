import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    // maxHeight: 1000,
    zIndex: 1,
    position: "absolute",
    background: "rgba(9, 17, 18, 0.65)",
    padding: "10px 20px",
    borderRadius: "15px",
    backdropFilter: "blur(2px)",
  },
  text: {
    color: "white",
    padding: "0 0 10px 0",
  },
  pos: {
    marginBottom: 10,
    color: "rgba(191, 192, 192, 1)",
  },
});

export default function Description() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.text} variant="h6">
          NY COVID SIDEWALK DENSITY
        </Typography>
        <Typography className={classes.pos} variant="body2" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
      </CardContent>
    </Card>
  );
}
