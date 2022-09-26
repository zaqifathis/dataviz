import React from "react";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { style } from "../../constrains";

const useStyles = makeStyles({
  root: {
    width: "200px",
    margin: "35px 10px 0 0",
    textAlign: "center",
    position: style.position,
    right: 0,
    borderRadius: style.borderRadius,
    backdropFilter: style.backdropFilter,
    background: style.background,
    zIndex: 1,
    color: style.color,
  },
  text: {
    marginBottom: 10,
    color: "rgba(191, 192, 192, 0.8)",
    fontSize: "10",
  },
});

function FilterDropDown() {
  const classes = useStyles();

  return <div></div>;
}

export default FilterDropDown;
