
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProduct, updateProduct } from '../../actions/productActions';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';


const ProductEditScreen = (props) => {

  const { match, history } = props;

  const productId = match.params.id
  

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState(0.00);
  const [rating, setRating] = useState(0.00);
  const [numReviews, setNumReviews] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false)

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
          setDescription(product.description);
          setCategory(product.category);
          setPrice(product.price);
          setRating(product.rating);
          setNumReviews(product.numReviews);
          setCountInStock(product.countInStock);
          setBrand(product.brand);
          setImage(product.image);
        }
    }

  }, [dispatch, product, productId, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({
      _id: product._id,
      name,
      description,
      category,
      brand,
      price,
      rating,
      numReviews,
      countInStock
    }))

  };


  const uploadImageHandler = async (e) => {
    const file = e.target.files[0]
    // setImage(file.name)

    const formData = new FormData()
    formData.append('image', file)
    formData.append('product_id', productId)

    try {
      setUploading(true)

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      await axios.post("/api/products/upload/", formData, config)

      setImage(file.name)
      setUploading(false)

    } catch (error) {
      setUploading(false)
    }
    console.log(formData);

  }


  return (
    <div className={'mb-5'}>
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

                <Form.Group controlId='image'>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter image'
                    value={image}
                    disabled
                  >
                  </Form.Control>
                  <Form.File
                    type='image-file'
                    label="Choose File"
                    custom
                    onChange={uploadImageHandler}
                  >
                  </Form.File>

                  {uploading && <Loader/>}

                </Form.Group>

                <Button type='submit' variant='primary'>Update</Button>
              </Form>
            )
        }
        

      </FormContainer>
    </div>
    
  )
}

export default ProductEditScreen
