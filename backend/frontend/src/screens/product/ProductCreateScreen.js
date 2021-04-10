
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createProduct } from '../../actions/productActions';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';


const ProductCreateScreen = (props) => {

  const {  history } = props;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState(0.00);
  const [rating, setRating] = useState(0.00);
  const [numReviews, setNumReviews] = useState(0);
  const [countInStock, setCountInStock] = useState(0);

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productCreate = useSelector(state => state.productCreate);
  const { error, loading, success } = productCreate;
  
  useEffect(() => {
    if (!userInfo) {
        history.push(`/login?previous=${history.location.pathname}`)
    }

    if (success) {
        history.push("/admin/productlist")
    }
    
    console.log(history)

  }, [userInfo, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(createProduct({
      name,
      description,
      category,
      brand,
      price,
      rating,
      numReviews,
      countInStock,
    }))

  };

  return (
    <div>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Add Product</h1>
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

                <Form.Group controlId='description'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    row={4}
                    placeholder='Enter description'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  >
                  </Form.Control>
                </Form.Group>

                <Row>
                  <Col>
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
                  </Col>
                  <Col>
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
                  </Col>
                </Row>

                <Row>
                  <Col>
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
                  </Col>
                  <Col>
                    <Form.Group controlId='rating'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        type='number'
                        placeholder='Enter rating'
                        value={rating}
                        onChange={ e => setRating(e.target.value)}
                      >
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group controlId='numReviews'>
                      <Form.Label>Number of Reviews</Form.Label>
                      <Form.Control
                        type='number'
                        placeholder='Enter numReviews'
                        value={numReviews}
                        onChange={ e => setNumReviews(e.target.value)}
                      >
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId='countInStock'>
                      <Form.Label>Count In Stock</Form.Label>
                      <Form.Control
                        type='number'
                        placeholder='Enter count In Stock'
                        value={countInStock}
                        onChange={ e => setCountInStock(e.target.value)}
                      >
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Button type='submit' variant='primary'>Create</Button>
              </Form>
            )
        }
      </FormContainer>
    </div>
    
  )
}

export default ProductCreateScreen
