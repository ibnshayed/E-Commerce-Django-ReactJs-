
import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { deleteUser, getAllUsers } from '../actions/userActions';
import DeleteModal from '../components/DeleteModal';
import Loader from '../components/Loader';
import Message from '../components/Message';

const UserListScreen = (props) => {

  const { history } = props

  const [show, setShow] = useState(false);

  const [deleteUserId, setDeleteUserId] = useState(null)

 

  const dispatch = useDispatch()
  const userList = useSelector(state => state.userList)
  const { users, loading, error } = userList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector(state => state.userDelete)
  const { success: successDelete } = userDelete
  
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllUsers())
    } else {
      history.push('/login')
    }
    
  }, [dispatch, userInfo, history, successDelete])

  // const deleteUserHandler = (id) => {

  //   if (window.confirm('Are you sure you want to delete this user?')) {
  //     dispatch(deleteUser(id))
  //   }
  // }
  
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setDeleteUserId(id);
    setShow(true); 
  }
  const handleOk = () => {
    // console.log('Delete User: ', deleteUserId)
    dispatch(deleteUser(deleteUserId))
    setShow(false);
  }
  

  return (
    <div>
      <DeleteModal show={show}
        title={'Delete'}
        text={'Are you sure you want to delete this user?'}
        handleClose={handleClose}
        handleOk={handleOk}
      />
      <h1>All Users</h1>
      {loading ? <Loader />
        : error ? <Message variant={'danger'} >{error}</Message>
          : (
            
            <Table striped hover responsive className={'table-sm'}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Is Admin</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { users.map((user, index) => (
                  <tr key={index}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <i className={'fa fa-check'} style={{ color: user.isAdmin ? "green" : "red" }}></i>
                    </td>
                    <td>
                      <LinkContainer to={`/admin/user/${user._id}`}>
                        <Button variant={'light'} className={'btn btn-sm'}>
                          <i className='fa fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button variant={'danger'}
                        className={'btn btn-sm'}
                        onClick={() => handleShow(user._id)}
                        disabled={user.isAdmin}
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

export default UserListScreen
