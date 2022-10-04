import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ButtonGroup, Button } from "@material-ui/core";
import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";
import WbCloudyOutlinedIcon from "@material-ui/icons/WbCloudyOutlined";
import NightsStayOutlinedIcon from "@material-ui/icons/NightsStayOutlined";

import Mapp from "../components/map/Map";
import Description from "../components/sidebar/Description";
import Analysis from "../components/sidebar/Analysis";
import Legend from "../components/sidebar/Legend";

import { style } from ".././constrains";

const useStyles = makeStyles({
  timeGroup: {
    zIndex: 2,
    position: style.position,
    right: 0,
    margin: "0 10px 0 0",
  },
  filterGroup1: {
    zIndex: 2,
    position: style.position,
    right: 0,
    margin: "50px 10px 0 0",
  },
  filterGroup2: {
    zIndex: 2,
    position: style.position,
    right: 0,
    margin: "85px 10px 0 0",
  },
  btn: {
    borderRadius: style.borderRadius,
    backdropFilter: style.backdropFilter,
    background: style.background,
    color: style.color,
    textTransform: "lowercase",
    fontWeight: "lighter",
  },
});

const filter = {
  total: "p_total_",
  subway: "subw_",
  office: "offi_",
  bank: "bank_",
  restaurant: "rest_",
  pharmacy: "phar_",
  supermarket: "supe_",
};

function MainPage() {
  const classes = useStyles();
  const [timeActive, setTimeActive] = useState("19");
  const [filterLoc, setFilterLoc] = useState(filter.total);

  return (
    <div>
      <ButtonGroup
        className={classes.timeGroup}
        variant="contained"
        color="primary"
      >
        <Button
          className={classes.btn}
          onClick={() => {
            setTimeActive("9");
          }}
          variant="contained"
          size="small"
          startIcon={<WbSunnyOutlinedIcon />}
        >
          9.00 am
        </Button>
        <Button
          className={classes.btn}
          onClick={() => setTimeActive("12")}
          variant="contained"
          size="small"
          startIcon={<WbCloudyOutlinedIcon />}
        >
          12.00 pm
        </Button>
        <Button
          className={classes.btn}
          onClick={() => setTimeActive("19")}
          variant="contained"
          size="small"
          startIcon={<NightsStayOutlinedIcon />}
        >
          19.00 pm
        </Button>
      </ButtonGroup>

      <ButtonGroup
        className={classes.filterGroup1}
        variant="contained"
        color="primary"
      >
        <Button
          className={classes.btn}
          onClick={() => {
            setFilterLoc(filter.total);
          }}
          variant="contained"
          size="small"
        >
          total
        </Button>
        <Button
          className={classes.btn}
          onClick={() => {
            setFilterLoc(filter.subway);
          }}
          variant="contained"
          size="small"
        >
          subway
        </Button>
        <Button
          className={classes.btn}
          onClick={() => setFilterLoc(filter.office)}
          variant="contained"
          size="small"
        >
          office
        </Button>
        <Button
          className={classes.btn}
          onClick={() => setFilterLoc(filter.pharmacy)}
          variant="contained"
          size="small"
        >
          pharmacy
        </Button>
      </ButtonGroup>

      <ButtonGroup
        className={classes.filterGroup2}
        variant="contained"
        color="primary"
      >
        <Button
          className={classes.btn}
          onClick={() => setFilterLoc(filter.bank)}
          variant="contained"
          size="small"
        >
          bank
        </Button>
        <Button
          className={classes.btn}
          onClick={() => {
            setFilterLoc(filter.restaurant);
          }}
          variant="contained"
          size="small"
        >
          restaurant
        </Button>
        <Button
          className={classes.btn}
          onClick={() => setFilterLoc(filter.supermarket)}
          variant="contained"
          size="small"
        >
          supermarket
        </Button>
      </ButtonGroup>

      <Description />
      <Analysis />
      <Legend />
      <Mapp selectedTime={timeActive} selectedLoc={filterLoc} />
    </div>
  );
}

export default MainPage;
