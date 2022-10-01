import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ButtonGroup, Button } from "@material-ui/core";
import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";
import WbCloudyOutlinedIcon from "@material-ui/icons/WbCloudyOutlined";
import NightsStayOutlinedIcon from "@material-ui/icons/NightsStayOutlined";

import Mapp from "../components/map/Map";
import Description from "../components/sidebar/Description";
import Analysis from "../components/sidebar/Analysis";
// import Btn from "../components/button/Button";

import { style } from ".././constrains";

const useStyles = makeStyles({
  root: {
    zIndex: 2,
    position: style.position,
    right: 0,
    margin: "0 10px 0 0",
  },
  switch: {
    zIndex: 2,
    position: "fixed",
    left: "50%",
  },
  btn: {
    borderRadius: style.borderRadius,
    backdropFilter: style.backdropFilter,
    background: style.background,
    color: style.color,
  },
});

function MainPage() {
  const classes = useStyles();
  const [time, setTime] = useState(19);

  return (
    <div>
      <ButtonGroup className={classes.root} variant="contained" color="primary">
        <Button
          className={classes.btn}
          onClick={() => setTime(9)}
          variant="contained"
          size="small"
          startIcon={<WbSunnyOutlinedIcon />}
        >
          9.00 am
        </Button>
        <Button
          className={classes.btn}
          onClick={() => setTime(12)}
          variant="contained"
          size="small"
          startIcon={<WbCloudyOutlinedIcon />}
        >
          12.00 pm
        </Button>
        <Button
          className={classes.btn}
          onClick={() => setTime(19)}
          variant="contained"
          size="small"
          startIcon={<NightsStayOutlinedIcon />}
        >
          19.00 pm
        </Button>
      </ButtonGroup>
      <Description />
      <Analysis />
      <Mapp selectedTime={time} />
    </div>
  );
}

export default MainPage;
