
import { Box, Button, Card, CardMedia, Divider, FormControl, Grid, InputLabel, List, ListItem, ListItemText, Select, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Col, Form, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink} from 'react-router-dom';
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

            <Box mb={2}>
                <Button
                    variant="outlined"
                    color='primary'
                    component={RouterLink}
                    to='/'

                >
                    Go Back
                </Button>
            </Box>

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

                                    <Grid item md={3}>
                                        <Card>
                                            <List component="nav" aria-label="main mailbox folders">
                                                <Box py={1}>
                                                    <ListItem>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={6}>Price:</Grid>
                                                                <Grid item xs={6}> <strong>${ product.price }</strong> </Grid>
                                                            </Grid>
                                                    </ListItem>
                                                </Box>
                                                <Divider />
                                                <Box py={1}>
                                                
                                                    <ListItem>
                                                        <Grid container>
                                                            <Grid item xs={6}>Price:</Grid>
                                                            <Grid item xs={6}> { product.countInStock > 0 ? "In Stock" : "Out Of Stock" }</Grid>
                                                        </Grid>
                                                    </ListItem>
                                                </Box>
                                                <Divider />
                                                <Box py={1}>
                                                
                                                    {product.countInStock > 0 && (
                                                        <ListItem>
                                                            <Grid container>
                                                                <Grid item xs={6}>Qty</Grid>
                                                                <Grid item xs={6}>
                                                                    
                                                                    <FormControl
                                                                        variant="outlined"
                                                                        size='small'
                                                                        style={{minWidth: '100%'}}
                                                                    >
                                                                            <InputLabel htmlFor="outlined-age-native-simple">Age</InputLabel>
                                                                            <Select
                                                                                native
                                                                                value={qty}
                                                                                onChange={e => setQty(e.target.value)}
                                                                                label="Qty"
                                                                            >
                                                                                {
                                                                                    [...Array(product.countInStock).keys()].map(x => (
                                                                                        <option key={x + 1} value={x + 1}>{ x + 1 }</option>
                                                                                    ))
                                                                                }
                                                                            </Select>
                                                                        </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                        </ListItem>
                                                    )}
                                                </Box>
                                                <ListItem>
                                                    <Button
                                                        variant='contained'
                                                        color='primary'
                                                        disabled={product.countInStock <= 0}
                                                        onClick={addToCartHandler}
                                                        fullWidth
                                                    >
                                                        Add to Cart
                                                    </Button>
                                                </ListItem>
                                            </List>
                                        </Card>
                                    </Grid>
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
                                                            variant='contained'
                                                            color='primary'
                                                        >
                                                            Sumbit
                                                        </Button>
                                                    </Form>

                                                ) : (
                                                        <Message variant = 'warning'>
                                                            Please <RouterLink to={`/login?previous=${history.location.pathname}`}>login</RouterLink> to write a review.
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