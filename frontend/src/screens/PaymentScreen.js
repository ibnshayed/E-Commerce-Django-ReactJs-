
import { useState } from 'react';
import { Button, Col, Form, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';

const PaymentScreen = (props) => {

  const { history } = props

  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  const dispatch = useDispatch()

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  // To redirect page at the beginning every time without dependency
  if (!shippingAddress.address) {
    history.push('/login');
  }

  // why not use like this? Because this depend on shippingAddress and history
  // useEffect(() => {
  //   if (!shippingAddress.address) {
  //     history.push('/login');
  //   }
  // }, [shippingAddress, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder');
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={submitHandler}>
        <FormGroup controlId='address'>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='paypal'
              name='paymentMethod'
              checked
              onChange={ e => setPaymentMethod(e.target.value)}
            >
            </Form.Check>
          </Col>
        </FormGroup>

        <Button type='submit' variant='primary'>Continue</Button>

      </Form>

    </FormContainer>
  )
}

export default PaymentScreen


