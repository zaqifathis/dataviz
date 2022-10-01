import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { style } from "../../constrains";

const useStyles = makeStyles({
  btn: {
    borderRadius: style.borderRadius,
    backdropFilter: style.backdropFilter,
    background: style.background,
    color: style.color,
  },
});

function Btn(props) {
  const classes = useStyles();
  return (
    <Button
      onClick={props.onUpdate}
      className={classes.btn}
      variant="contained"
      size="small"
      startIcon={props.icon}
    >
      {props.name}
    </Button>
  );
}

export default Btn;
