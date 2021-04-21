
import { Card, CardMedia, Divider, Grid, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Button, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createProductReview, getProduct } from '../../actions/productActions';
import CircularLoader from '../../components/materialui/CircularLoader';
import StarRating from '../../components/materialui/StarRating';
import Rating from '../../components/Rating';
import { PRODUCT_REVIEW_CREATE_RESET } from '../../constants/productConstants';
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
                loading ? <CircularLoader />
                    : error ? <Message>{error}</Message>
                        : (
                            <div>
                                <Grid container spacing={2}>
                                    <Grid item md={5}>
                                        <CardMedia
                                                component='img'
                                                image={product.image}
                                                height='100%'
                                            />
                                    </Grid>
                                    <Grid item md={3}>
                                        <List component="nav" aria-label="main mailbox folders">
                                            <ListItem>
                                                <Typography
                                                    variant='h4'
                                                    component='h2'
                                                >
                                                    {product.name}
                                                </Typography>
                                            </ListItem>
                                            <Divider />

                                            <ListItem>
                                                <StarRating rating={product.rating} reviews={ product.numReviews }/>
                                            </ListItem>
                                            <Divider />
                                            <ListItem>
                                                <ListItemText primary={`Price: ${product.price}`}/>
                                            </ListItem>
                                            <Divider />
                                            <ListItem>
                                                <ListItemText primary={`Description: ${product.description}`}/>
                                            </ListItem>
                                        </List>
                                    </Grid>

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
                                </Grid>
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