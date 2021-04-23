import { Button, CardMedia, FormControl, Grid, IconButton, InputLabel, Paper, Select } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import Message from "../../components/Message";

const CartScreen = (props) => {
  const { match, history, location } = props;
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart); // get from store's reducer as state
  const { cartItems } = cart;
  // console.log("cartItems", cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant={"info"}>
            Your cart is empty <Link to="/">Go Back</Link>{" "}
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={2}>
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name}
                      // style={{width: '100px'}}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} className="m-auto">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Grid>
                  <Grid item xs={12} md={2} className="m-auto">
                    ${item.price}
                  </Grid>
                  <Grid item xs={12} md={2} className="m-auto">
                    {/* <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control> */}
                    <FormControl
                              variant="outlined"
                              size="small"
                              style={{ minWidth: "100%" }}
                            >
                              <InputLabel htmlFor="outlined-age-native-simple">
                                Qty
                              </InputLabel>
                              <Select
                                native
                                value={item.qty}
                                onChange={(e) =>
                                  dispatch(
                                    addToCart(item.product, Number(e.target.value))
                                  )
                                }
                                label="Qty"
                              >
                                {[...Array(item.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={1} className="m-auto">
                    {/* <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button> */}
										<IconButton aria-label="delete"
											onClick={() => removeFromCartHandler(item.product)}
											color='secondary'
										>
                      <DeleteIcon fontSize="large" />
                    </IconButton>
                  </Grid>
                </Grid>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Grid container>
                <Grid item>Total Price:</Grid>
                <Grid item>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.price * item.qty, 0)
                    .toFixed(2)}
                </Grid>
              </Grid>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CartScreen;
