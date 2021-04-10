
import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createProductReview, getProduct } from '../../actions/productActions';
import Rating from '../../components/Rating';
import { PRODUCT_REVIEW_CREATE_RESET } from '../../constants/productConstants';
import Loader from './../../components/Loader';
import Message from './../../components/Message';

const ProductScreen = (props) => {

    const { match, history } = props;
    
    const id = match.params.id;

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    // const product = products.find(p => p._id === id);
    
    // const [product, setProduct] = useState([])

    // const getProduct = async () => {
    //     const { data } = await axios.get(`/api/products/${id}`)
    //     setProduct(data)
    // }

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;

    const productReviewCreate = useSelector(state => state.productReviewCreate);
    const { success: successReview, loading: loadingReview, error: errorReview } = productReviewCreate;

    useEffect(() => {

        if (successReview) {
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_REVIEW_CREATE_RESET})
        }
        // getProduct()
        dispatch(getProduct(id));
        
    }, [dispatch, id, successReview]);

    const addToCartHandler = () => {
        history.push(`/cart/${id}?qty=${qty}`);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProductReview(id, {
            rating,
            comment,
        }))
    }


    return (
        <div>

            <Link to="/" className="btn btn-light my-3">Go Back</Link>

            {
                loading ? <Loader />
                    : error ? <Message>{error}</Message>
                        : (
                            <div>
                                <Row>
                                    <Col md={6}>
                                        <Image src={product.image} alt={product.name} fluid />
                                    </Col>
                                    <Col md={3}>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <h3>{product.name}</h3>
                                            </ListGroup.Item>
                                        
                                            <ListGroup.Item>
                                                <Rating value={product.rating}
                                                    text={`${product.numReviews} reviews`}
                                                />
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                Price: {product.price}
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                Description: {product.description}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>

                                    <Col md={3}>
                                        <Card>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Price:</Col>
                                                        <Col> <strong>${ product.price }</strong> </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Price:</Col>
                                                        <Col> { product.countInStock > 0 ? "In Stock" : "Out Of Stock" }</Col>
                                                    </Row>
                                                </ListGroup.Item>
                                                
                                                {product.countInStock > 0 && (
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col className='my-1'>Qty</Col>
                                                            <Col sx={'auto'} className='my-1'>
                                                                <Form.Control as="select"
                                                                    value={qty}
                                                                    onChange={e => setQty(e.target.value)}
                                                                    >
                                                                    {
                                                                        [...Array(product.countInStock).keys()].map(x => (
                                                                            <option key={x + 1} value={x + 1}>{ x + 1 }</option>
                                                                        ))
                                                                    }

                                                                </Form.Control>
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                )}

                                                <ListGroup.Item>
                                                    <Button className="btn-block"
                                                        type="button"
                                                        disabled={product.countInStock <= 0}
                                                        onClick={addToCartHandler}
                                                    >
                                                        Add to Cart
                                                    </Button>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row className={"mt-5"}>
                                    <Col md={6}>
                                        <h4>Reviews</h4>
                                        {product.reviews.length === 0 && <Message variant={'info'}>No Reviews</Message>}
                                        <ListGroup variant='flush'>
                                            {product.reviews.map(review => (
                                                <ListGroup.Item key={review._id}>
                                                    <strong>{review.name}</strong>
                                                    <Rating value={review.rating} />
                                                    <p>{review.createdAt.substring(0, 10)}</p>
                                                    <p>{ review.comment }</p>
                                                </ListGroup.Item>
                                            ))}
                                            <ListGroup.Item>
                                                <h4>Write a Review</h4>
                                                {loadingReview && <loader/>}
                                                {successReview && <Message variant='success'>Review is submitted</Message>}
                                                { userInfo && errorReview && <Message variant='danger'>{errorReview}</Message>}
                                                {userInfo ? (
                                                    <Form onSubmit={submitHandler}>
                                                        <Form.Group controlId="rating">
                                                            <Form.Label>Review</Form.Label>
                                                            <Form.Control
                                                                as="select"
                                                                value={rating}
                                                                onChange={ e => setRating(e.target.value)}
                                                            >
                                                                <option value={0}>Select...</option>
                                                                <option value={1}>1 - Poor</option>
                                                                <option value={2}>2 - Fair</option>
                                                                <option value={3}>3 - Good</option>
                                                                <option value={4}>4 - Very Good</option>
                                                                <option value={5}>5 - Exelent</option>
                                                            </Form.Control>
                                                        </Form.Group>

                                                        <Form.Group controlId="comment">
                                                            <Form.Label>Comment</Form.Label>
                                                            <Form.Control
                                                                as="textarea"
                                                                row="5"
                                                                value={comment}
                                                                onChange={ e => setComment(e.target.value)}
                                                            >
                                                            </Form.Control>
                                                        </Form.Group>
                                                        <Button
                                                            disabled={loadingReview}
                                                            type='submit'
                                                            variant='primary'
                                                        >
                                                            Sumbit
                                                        </Button>
                                                    </Form>

                                                ) : (
                                                        <Message variant = 'warning'>
                                                            Please <Link to={`/login?previous=${history.location.pathname}`}>login</Link> to write a review.
                                                        </Message>
                                                )}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                </Row>
                            </div>
                        )
            }
            
        </div>
     );
}
 
export default ProductScreen;