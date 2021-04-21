import { Grid, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import React from 'react';

const StarRating = (props) => {

  const { rating, reviews } = props;
  

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Grid container spacing={1}>
          <Grid item>
            <Rating
              name="simple-controlled"
              value={rating}
              precision={0.5}
              readOnly
            />
          </Grid>
          <Grid item>
            <Typography
              variant="subtitle1"
              component='span'
              >
              {reviews} reviews
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default StarRating
