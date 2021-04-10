
import { useEffect } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { getAdminOrderList } from '../../actions/orderActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const OrderListScreen = (props) => {

  const { history } = props

  const dispatch = useDispatch()

  const orderListAdmin = useSelector(state => state.orderListAdmin)
  const { orders , loading, error } = orderListAdmin

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAdminOrderList())
    } else {
      history.push('/login')
    }
    
  }, [dispatch, userInfo, history])

  


  return (
    <div>
      <Row className='align-items-center'>
        <Col>
          <h1>All Orders</h1>
        </Col>
      </Row>
      {loading ? <Loader />
        : error ? <Message variant={'danger'} >{error}</Message>
          : (
            
            <Table striped bordered hover responsive className={'table-sm'}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order._id}</td>
                    <td>{order.user.name}</td>
                    <td>{order.createdAt.substring(0,10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                        <i className="fa fa-times" style={{color: 'red'}}></i>
                      ) }</td>
                    <td>
                      {order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                        <i className="fa fa-times" style={{color: 'red'}}></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant={'light'} className={'btn btn-sm'}>
                          Details
                        </Button>
                      </LinkContainer>
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

export default OrderListScreen
