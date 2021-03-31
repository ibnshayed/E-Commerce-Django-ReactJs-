
import { useState } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useSelector, useDispatch } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = (props) => {

  const { history } = props

  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);


  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2/>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>

        <FormGroup controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter address'
            value={address ? address : ''}
            onChange={ e => setAddress(e.target.value)}
          >
          </Form.Control>
        </FormGroup>

        <FormGroup controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter city'
            value={city ? city : ''}
            onChange={ e => setCity(e.target.value)}
          >
          </Form.Control>
        </FormGroup>

        <FormGroup controlId='postalCode'>
          <Form.Label>PostalCode</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter postalCode'
            value={postalCode ? postalCode : ''}
            onChange={ e => setPostalCode(e.target.value)}
          >
          </Form.Control>
        </FormGroup>

        <FormGroup controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter country'
            value={country ? country : ''}
            onChange={ e => setCountry(e.target.value)}
          >
          </Form.Control>
        </FormGroup>

        <Button
          type='submit'
          variant='primary'
        >
          Continue
        </Button>

      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
