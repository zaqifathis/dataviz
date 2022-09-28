import React from "react";
import {
  Select,
  FormControl,
  InputLabel,
  InputBase,
  MenuItem,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { style } from "../../data/constrains";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: style.borderRadius,
    position: "relative",
    backdropFilter: style.backdropFilter,
    backgroundColor: style.background,
    border: "0.5px solid #ced4da",
    fontSize: 14,
    color: "white",
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: style.borderRadius,
      borderColor: style.background,
      // boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles({
  filter: {
    zIndex: 2,
    borderRadius: style.borderRadius,
    backdropFilter: style.backdropFilter,
    background: style.background,
    color: style.color,
    position: style.position,
    right: 0,
    margin: "40px 10px 0 0",
    textAlign: "center",
    width: "200px",
  },
});

function Filter(props) {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.filter}>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={props.type}
          input={<BootstrapInput />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={0}>Total pedestrian</MenuItem>
          <MenuItem value={1}>Restaurant</MenuItem>
          <MenuItem value={2}>Bank</MenuItem>
          <MenuItem value={3}>Office</MenuItem>
          <MenuItem value={4}>Restaurant</MenuItem>
          <MenuItem value={5}>Pharmacy</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default Filter;
