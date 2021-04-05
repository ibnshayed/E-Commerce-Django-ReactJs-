
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrderList } from '../actions/orderActions';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { LinkContainer } from 'react-router-bootstrap';

const ProfileScreen = ( props ) => {

  const {history } = props;
  

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector(state => state.userDetails);
  const { error, loading, user } = userDetails;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector(state => state.orderListMy);
  const { orders, loading: loadingOrderList, error: errorOrderList } = orderListMy;
  
  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
        if (!user || !user.name || success) {
          dispatch({ type: USER_UPDATE_PROFILE_RESET });
          dispatch(getUserDetails('profile'));
          dispatch(getMyOrderList())
        } else {
          setName(user.name);
          setEmail(user.email);
        }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(updateUserProfile({
        'id': user._id,
        'name': name,
        'email': email,
        'password': password,
      }))
      setMessage('');
    }

  };

  return (
    <Row>
      <Col md={4}>
        <>
          <h1>User Profile</h1>
          { message && <Message variant='danger'>{message}</Message>}
          { error && <Message variant='danger'>{error}</Message>}
          { loading && <Loader/>}
          <Form onSubmit={submitHandler}>

          <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={e => setName(e.target.value)}
                required
              >
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={ e => setEmail(e.target.value)}
                required
              >
              </Form.Control>
            </Form.Group>
            
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={ e => setPassword(e.target.value)}
              >
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={confirmPassword}
                onChange={ e => setConfirmPassword(e.target.value)}
              >
              </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>Register</Button>
          </Form>
        </>
      </Col>
      <Col md={8}>
        <h1>My Orders</h1>
        {loadingOrderList ? <Loader /> :
          errorOrderList ? <Message variant='info'>{errorOrderList}</Message>
            : (
              <Table striped responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Date</th>
                    <th>Total Price</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index}>
                      <td>{order._id }</td>
                      <td>{ order.createdAt.substring(0,10) }</td>
                      <td>${order.totalPrice }</td>
                      <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                        <i className="fa fa-times" style={{color: 'red'}}></i>
                      ) }</td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button className='btn btn-sm'>Details</Button>
                        </LinkContainer>
                      </td>
                      <td></td>
                    </tr>

                  ))}
                </tbody>
              </Table>
            )
        }

      </Col>
    </Row>
  )
}

export default ProfileScreen
