
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProduct, updateProduct } from '../../actions/productActions';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';


const UserEditScreen = (props) => {

  const { match, history } = props;

  const productId = match.params.id
  

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState('');
  // const [price, setPrice] = useState(0);

  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector(state => state.productUpdate);
  const { error: errorUpdate, loading: loadingUpdate, success: successUpdate} = productUpdate;
  
  useEffect(() => {
    if (successUpdate) {
      history.push('/admin/productlist')
    } else {
        if (!product || product._id !== Number(productId)) {
          dispatch(getProduct(productId))
        } else {
          setName(product.name);
          setCategory(product.category);
          setPrice(product.price);
          setBrand(product.brand);
        }
    }

  }, [dispatch, product, productId, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateProduct({_id: product._id,name,category,price,brand}))

  };

  return (
    <div>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant={'danger'} >{errorUpdate}</Message>}
        {loading ? <Loader />
          : error ? <Message variant={'danger'} >{error}</Message>
            : (
              <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                  >
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId='category'>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter category'
                    value={category}
                    onChange={ e => setCategory(e.target.value)}
                  >
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId='price'>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter price'
                    value={price}
                    onChange={ e => setPrice(e.target.value)}
                  >
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId='brand'>
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter brand'
                    value={brand}
                    onChange={ e => setBrand(e.target.value)}
                  >
                  </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>Update</Button>
              </Form>
            )
        }
        

      </FormContainer>
    </div>
    
  )
}

export default UserEditScreen
