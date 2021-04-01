
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../actions/productActions';
import Loader from './../components/Loader';
import Message from './../components/Message';

const ProductScreen = (props) => {

    const { match, history } = props;
    
    const [qty, setQty] = useState(1);
    const id = match.params.id;
    // const product = products.find(p => p._id === id);
    
    // const [product, setProduct] = useState([])

    // const getProduct = async () => {
    //     const { data } = await axios.get(`/api/products/${id}`)
    //     setProduct(data)
    // }

    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;

    useEffect(() => {

        // getProduct()
        dispatch(getProduct(id));
        
    }, [dispatch, id]);

    const addToCartHandler = () => {
        history.push(`/cart/${id}?qty=${qty}`);
    }



    return (
        <div>

            <Link to="/" className="btn btn-light my-3">Go Back</Link>

            {
                loading ? <Loader />
                    : error ? <Message>{error}</Message>
                        : (
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
                                                    disabled={product.countInStock === 0}
                                                    onClick={addToCartHandler}
                                                >
                                                    Add to Cart
                                                </Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                        )
            }
            
        </div>
     );
}
 
export default ProductScreen;