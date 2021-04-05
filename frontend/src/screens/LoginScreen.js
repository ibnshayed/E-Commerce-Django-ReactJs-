
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';


const LoginScreen = (props) => {

  const { location, history } = props;
  
  const redirect = location.search ? location.search.split("=")[1] : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));

  };

  return (
    <FormContainer>
      <h1>Log in</h1>
      { error && <Message variant='danger'>{error}</Message>}
      { loading && <Loader/>}
      <Form onSubmit={submitHandler}>

        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={ e => setEmail(e.target.value)}
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

        <Button type='submit' variant='primary'>Log in</Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer? <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Register
            </Link>
        </Col>
      </Row>

    </FormContainer>
  )
}

export default LoginScreen
