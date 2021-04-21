import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import React from 'react';
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
    },
  },
}));

const Paginate = (props) => {

  const { pages, page, keyword } = props;
  const history = useHistory()

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify='center'>
        <Grid item>
          <Pagination
            count={pages}
            page={page}
            color="primary"
            showFirstButton
            showLastButton
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`${history.location.pathname}?${keyword ? `keyword=${keyword}&` : ''}page=${item.page}`}
                {...item}
              />
              )}
            />
          </Grid>
      </Grid>
    </div>
  );
}

export default Paginate
