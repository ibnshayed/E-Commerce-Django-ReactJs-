import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color='inherit'>
        <Toolbar>
          <Typography variant="body1"
            className={classes.title}
            align='center'
            color='inherit'

          >
            Copyright By @Emran Ibn Shayed
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
