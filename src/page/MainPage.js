import React from "react";
import Mapp from "../components/map/Map";
import Description from "../components/sidebar/Description";
import Analysis from "../components/sidebar/Analysis";
function MainPage() {
  return (
    <div>
      <Description />
      <Analysis />
      <Mapp />
    </div>
  );
}

export default MainPage;
