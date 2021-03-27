
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addToCart } from './../actions/cartActions';

const CartScreen = (props) => {

  const { match, history, location } = props;
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1


  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart); // get from store's reducer as state
  const { cartItems } = cart;
  console.log("cartItems", cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <div>
      Cart
    </div>
  )
}

export default CartScreen

