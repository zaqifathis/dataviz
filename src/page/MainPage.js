import React from "react";
import Mapp from "../components/map/Map";
import Description from "../components/sidebar/Description";
import Analysis from "../components/sidebar/Analysis";
import BtnGroup from "../components/buttons/Buttons";
import FilterDropDown from "../components/filter-btn/Filter";

function MainPage() {
  return (
    <div>
      <BtnGroup />
      <FilterDropDown />
      <Description />
      <Analysis />
      <Mapp />
    </div>
  );
}

export default MainPage;
