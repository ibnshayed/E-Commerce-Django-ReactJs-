import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addToCart, removeFromCart } from './../actions/cartActions';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { Link } from 'react-router-dom';

const CartScreen = (props) => {

  const { match, history, location } = props;
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1


  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart); // get from store's reducer as state
  const { cartItems } = cart;
  // console.log("cartItems", cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0
          ? <Message variant={'info'}>Your cart is empty <Link to='/'>Go Back</Link> </Message>
          : (
            <ListGroup variant="flush">
              {cartItems.map(item => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} width={200} fluid thumbnail/>
                    </Col>
                    <Col md={3} className='m-auto'><Link to={`/product/${item.product}`}>{ item.name }</Link></Col>
                    <Col md={2} className='m-auto'>${ item.price }</Col>
                    <Col md={2} className='m-auto'>
                      <Form.Control as="select"
                          value={item.qty}
                          onChange={e => dispatch(addToCart( item.product,Number(e.target.value)))}
                        >
                        {
                          [...Array(item.countInStock).keys()].map(x => (
                            <option key={x + 1} value={x + 1}>
                              { x + 1}
                            </option>))
                        }
                      </Form.Control>
                    </Col>
                    <Col md={1} className='m-auto'>
                      <Button type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>

                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
                
              ))}
            </ListGroup>
          )}
      </Col>
      <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Subtotal ({cartItems.reduce((acc,item) => acc + item.qty, 0)}) items</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price:</Col>
                  <Col>${cartItems.reduce((acc,item) => acc + item.price * item.qty, 0).toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className="btn-block"
                  type="button"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                  >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        
      </Col>
    </Row>
  )
}

export default CartScreen

