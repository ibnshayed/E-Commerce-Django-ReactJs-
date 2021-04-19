
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import { useQuery } from '../components/utils';
import Product from './../components/Product';


const HomeScreen = (props) => {

    // const [products, setProducts] = useState([])
    // const { history } = props;
    const query = useQuery()

    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { error, loading, products, pages } = productList;

    // const getProducts = async () => {
    //     const {data} = await axios.get('/api/products/')
    //     setProducts(data)
    // }

    // const keyword = history.location.search
  const keyword = query.get('keyword') != null ? query.get('keyword') : ''
  const page = query.get('page') != null ? query.get('page') : 1
//   const keyword = query.get('keyword') != null ? query.get('keyword') : ''

    
    
    useEffect(() => {
        // getProducts()
        dispatch(listProducts(keyword,page,4));

    }, [dispatch, keyword,page]);


    return (
        
        <div>
            {!keyword && <ProductCarousel />}
            
            {keyword ? 
                <h1>Search Result: {keyword}</h1>
                : <h1 className="mt-3">Latest Products</h1>
            }
            
            {loading ? <Loader/>
                : error ? <Message variant={'danger'}>{error}</Message>
                    :
                    <div>
                        <Row>
                            {products.map(product => (
                                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product={product}/>
                                    </Col>
                            ))}
                        </Row>
                        <Paginate pages={pages} page={page} keyword={keyword}/>
                    </div>
            }
            
        </div>
     );
}
 
export default HomeScreen;