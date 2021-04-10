import { useEffect, useState } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, getOrderDetails, payOrder } from "../../actions/orderActions";
import Message from "../../components/Message";
import { ORDER_DELIVERED_RESET, ORDER_PAY_RESET } from "../../constants/orderConstants";
import Loader from '../../components/Loader';

const OrderScreen = (props) => {

  const { match, history } = props;
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false)

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector(state => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  if (!loading && !error) {
    order.itemsPrice = Number(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)).toFixed(2);
  }
  // Paypal Client Id:  AdHx_WKrdw7BhlTYiawt4e8Nl9yCFMsFH526eVmLp_v5y9DlHqyR7cEkjdvecbFIOXptrrJ82Pily0O1

  const addPaypalScript = () => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://www.paypal.com/sdk/js?client-id=AdHx_WKrdw7BhlTYiawt4e8Nl9yCFMsFH526eVmLp_v5y9DlHqyR7cEkjdvecbFIOXptrrJ82Pily0O1";
    script.async = true;
    script.onload = () => {
      setSdkReady(true)
    };
    document.body.appendChild(script);

  }

  useEffect(() => {

    if (!userInfo) {
      history.push(`/login?previous=${history.location.pathname}`)
    }

    if (!order || successPay || order._id !== Number(orderId) || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVERED_RESET })
      dispatch(getOrderDetails(orderId))
    }
    else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [userInfo, history, dispatch, order, orderId, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }

  const orderDeliverHandler = () => {
    dispatch(deliverOrder(order))
  }


  return (
    <div>
      {loading ? <Loader /> :
        error ? (<Message variant='danger'>{error} </Message>) : (
          <>
            <h1>Order No. : {order._id }</h1>
      
            <Row>
              <Col md={8}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>Name: <strong>{order.user.name}</strong></p>
                    <p>Email:  <a href={`mailto:${order.user.email}`}>{order.user.email}</a> </p>
                    <p>
                      <strong>Shipping: </strong>
                      {order.shippingAddress.address}, {order.shippingAddress.city},
                      {' '}
                      {order.shippingAddress.postalCode},
                      {' '}
                      {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ?
                      <Message variant="success">Delivered on {order.deliveredAt}</Message>
                      : <Message variant="warning">Not Delivered</Message>
                    }
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                      <strong>Method: </strong>
                      {order.paymentMethod}
                    </p>
                    {order.isPaid ?
                      <Message variant="success">Paid on {order.paidAt}</Message>
                      : <Message variant="warning">Not Paid</Message>
                    }
                    
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h2>Order Items</h2>
                    {order.orderItems.length === 0 ? <Message variant='info'>
                      Your order is empty
                    </Message> : (
                        <ListGroup variant='flush'>
                          {order.orderItems.map((item, index) => (
                            <ListGroup.Item key={index}>
                              <Row>
                                <Col md={1}>
                                  <Image src={item.image} alt={ item.name } fluid rounded/>
                                </Col>
                                <Col>
                                  <Link to={`/product/${item.product}`}>{ item.name }</Link>
                                </Col>
                                <Col md={4}>
                                  {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={4}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Item:</Col>
                        <Col>${order.itemsPrice} </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Shipping:</Col>
                        <Col>${order.shippingPrice} </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Tax:</Col>
                        <Col>${order.taxPrice} </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Total:</Col>
                        <Col>${order.totalPrice} </Col>
                      </Row>
                    </ListGroup.Item>
                      {!order.isPaid && (
                        <ListGroup.Item>
                          {loadingPay && <Loader />}
                          {!sdkReady ? (
                            <Loader/>
                          ): (
                              <PayPalButton
                                amount={order.totalPrice}
                                onSuccess={successPaymentHandler}
                              />
                          )}
                        </ListGroup.Item>
                      )}
                    
                    {loadingDeliver && <Loader />}
                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                      <ListGroup.Item>
                        <Button className="btn btn-block" onClick={orderDeliverHandler}>Mark as Delivered</Button>
                      </ListGroup.Item>
                    )}

                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </>
        )
      }
    </div>
  )
}

export default OrderScreen
