
import { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { deleteProduct, listProducts } from '../../actions/productActions';
import DeleteModal from '../../components/DeleteModal';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const ProductListScreen = (props) => {

  const { history } = props

  const [show, setShow] = useState(false);

  const [deleteProductId, setDeleteProductId] = useState(null)

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { products , loading, error } = productList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productDelete = useSelector(state => state.productDelete)
  const { success: successDelete } = productDelete
  
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts())
    } else {
      history.push('/login')
    }
    
  }, [dispatch, userInfo, history, successDelete])

  
  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setDeleteProductId(id);
    setShow(true); 
  }

  const handleOk = () => {
    console.log('Delete User: ', deleteProductId)
    dispatch(deleteProduct(deleteProductId))
    setShow(false);
  }


  return (
    <div>
      <DeleteModal show={show}
        title={'Delete'}
        text={'Are you sure you want to delete this product?'}
        handleClose={handleClose}
        handleOk={handleOk}
      />
      <Row className='align-items-center'>
        <Col>
          <h1>All Products</h1>
        </Col>
        <Col className='text-right'>
          <Link to={'admin/addproduct'}>
            <Button variant="primary"><i className="fa fa-plus"></i> Add Product</Button>
          </Link>
        </Col>
      </Row>
      {loading ? <Loader />
        : error ? <Message variant={'danger'} >{error}</Message>
          : (
            
            <Table striped bordered hover responsive className={'table-sm'}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { products.map((product, index) => (
                  <tr key={index}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{ product.category }</td>
                    <td>{ product.brand }</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}`}>
                        <Button variant={'light'} className={'btn btn-sm'}>
                          <i className='fa fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button variant={'danger'}
                        className={'btn btn-sm'}
                        onClick={() => handleShow(product._id)}
                      >
                          <i className='fa fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )
      }
    </div>
  )
}

export default ProductListScreen
