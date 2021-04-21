import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import StarRating from './StarRating';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const Product = (props) => {
  const classes = useStyles();

  const { product } = props;
  


  return (
    <Card className={classes.root}>
      <CardActionArea
        component={RouterLink}
        to={`/product/${product._id}`}
      >
        <CardMedia
          className={classes.media}
          component="img"
          alt={product.name}
          image={product.image}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {product.name}
          </Typography>
        </CardContent>

      </CardActionArea>
      <CardContent>
          <StarRating
            rating={product.rating}
            reviews={product.numReviews}
        />
        
        <Typography variant="h5">
          ${product.price}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}


export default Product