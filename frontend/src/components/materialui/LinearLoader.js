import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const LinearLoader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress />
      <LinearProgress color="secondary" />
    </div>
  );
};

export default LinearLoader;
