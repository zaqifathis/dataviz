import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ButtonGroup, Button } from "@material-ui/core";
import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";
import WbCloudyOutlinedIcon from "@material-ui/icons/WbCloudyOutlined";
import NightsStayOutlinedIcon from "@material-ui/icons/NightsStayOutlined";
import ClearAllOutlinedIcon from "@material-ui/icons/ClearAllOutlined";
import Btn from "./Button";
import { style } from "../../constrains";

const useStyles = makeStyles({
  root: {
    zIndex: 2,
    position: style.position,
    right: 0,
    margin: "0 10px 0 0",
  },
});

function BtnGroup() {
  const classes = useStyles();
  const [activeButton, setActiveButton] = useState();

  return (
    <ButtonGroup
      className={classes.root}
      size="small"
      variant="contained"
      color="primary"
    >
      <Btn name={"09.00 am"} icon={<WbSunnyOutlinedIcon />} />
      <Btn name={"12.00 pm"} icon={<WbCloudyOutlinedIcon />} />
      <Btn name={"19.00 pm"} icon={<NightsStayOutlinedIcon />} />
      <Btn name={"average"} icon={<ClearAllOutlinedIcon />} />
    </ButtonGroup>
  );
}

export default BtnGroup;
