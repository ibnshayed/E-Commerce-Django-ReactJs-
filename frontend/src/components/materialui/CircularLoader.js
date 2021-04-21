import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const CircularLoader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify='center'>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    </div>
  );
}

export default CircularLoader;
