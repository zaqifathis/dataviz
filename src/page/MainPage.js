import React, { useState, useEffect } from "react";

import Mapp from "../components/map/Map";
// import Description from "../components/sidebar/Description";
import Legend from "../components/sidebar/Legend";
import { style } from ".././constrains";

import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import WbTwilightOutlinedIcon from "@mui/icons-material/WbTwilightOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NightsStayOutlinedIcon from "@mui/icons-material/NightsStayOutlined";
import Container from "@mui/material/Container";
import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";

const filter = {
  total: "p_total_",
  subway: "subw_",
  office: "offi_",
  bank: "bank_",
  restaurant: "rest_",
  pharmacy: "phar_",
  supermarket: "supe_",
};

const ToggleButton = styled(MuiToggleButton)(() => ({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: "rgba(32, 175, 199, 0.89)",
  },
  textTransform: "lowercase",
  color: "white",
  borderColor: "rgba(55, 55, 55, 0.8)",
}));

function updateFormat(loc, time) {
  const formats = [];
  for (let i = 0; i < loc.length; i++) {
    formats.push(loc[i] + time);
  }
  return formats;
}

function MainPage() {
  const [timeActive, setTimeActive] = useState("19");
  const [filterLoc, setFilterLoc] = useState("subw_");
  const [locations, setLocs] = React.useState(() => [filter.subway]);
  const [activeLayers, setActiveLayers] = useState(["subw_19", "offi_19"]);

  useEffect(() => {
    setActiveLayers(updateFormat(locations, timeActive));
  }, [timeActive]);

  useEffect(() => {
    setActiveLayers(updateFormat(locations, timeActive));
  }, [locations]);

  const handleLocations = (event, newFormats) => {
    if (newFormats.length === 0) {
      setLocs([filter.subway]);
      return;
    }
    if (newFormats.length > 1) {
      if (newFormats[0] === filter.total) {
        newFormats.shift();
        setLocs(newFormats);
        return;
      }
      if (newFormats.includes(filter.total)) {
        setLocs([filter.total]);
        return;
      }
    }
    setLocs(newFormats);
  };

  const handleTime = (event, newTime) => {
    if (newTime === null) {
      setTimeActive("19");
      return;
    }
    setTimeActive(newTime);
  };

  return (
    <div>
      <Container
        sx={{
          width: 400,
          position: "absolute",
          right: 0,
          margin: "10px 0 0 0",
          zIndex: 2,
        }}
      >
        <ToggleButtonGroup
          sx={{
            background: `${style.background}`,
          }}
          fullWidth={true}
          size="small"
          exclusive
          value={timeActive}
          onChange={handleTime}
        >
          <ToggleButton value="9">
            <WbTwilightOutlinedIcon /> 9 am
          </ToggleButton>
          <ToggleButton value="12">
            <WbSunnyOutlinedIcon />
            12 pm
          </ToggleButton>
          <ToggleButton value="19">
            <NightsStayOutlinedIcon />
            19 pm
          </ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup
          sx={{
            background: `${style.background}`,
          }}
          fullWidth={true}
          size="small"
          value={locations}
          onChange={handleLocations}
        >
          <ToggleButton value={filter.total}>all</ToggleButton>
          <ToggleButton value={filter.subway}>subway</ToggleButton>
          <ToggleButton value={filter.office}>office</ToggleButton>
          <ToggleButton value={filter.pharmacy}>pharmacy</ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          sx={{
            background: `${style.background}`,
          }}
          fullWidth={true}
          size="small"
          value={locations}
          onChange={handleLocations}
        >
          <ToggleButton value={filter.bank}>bank</ToggleButton>
          <ToggleButton value={filter.restaurant}>restaurant</ToggleButton>
          <ToggleButton value={filter.supermarket}>supermarket</ToggleButton>
        </ToggleButtonGroup>
      </Container>

      {/* <Description /> */}
      <Mapp
        selectedTime={timeActive}
        selectedLoc={filterLoc}
        activeLayers={activeLayers}
      />
      <Legend />
    </div>
  );
}

export default MainPage;
