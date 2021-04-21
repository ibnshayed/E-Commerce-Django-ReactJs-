
import { Grid, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import CircularLoader from '../components/materialui/CircularLoader';
import Paginate from '../components/materialui/Paginate';
import Message from '../components/Message';
import ProductCarousel from '../components/ProductCarousel';
import { useQuery } from '../components/utils';
import Product from './../components/materialui/Product';


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
  const page = query.get('page') != null ? Number(query.get('page')) : 1
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
                : <Typography variant='h4' component='h1'>Latest Products</Typography>
            }
            
            {loading ? <CircularLoader/>
                : error ? <Message variant={'danger'}>{error}</Message>
                    :
                    <div>
                        <Grid
                            container
                            spacing={2}
                        >
                            {products.map(product => (
                                <Grid
                                    container
                                    item
                                    key={product._id}
                                    xs={12}
                                    sm={6}
                                    md={3}
                                    // spacing={3}
                                >
                                        <Product product={product} />
                                </Grid>
                            ))}
                        </Grid>
                        { pages > 1 && <Paginate pages={pages} page={page} keyword={keyword} />}
                    </div>
            }
            
        </div>
     );
}
 
export default HomeScreen;