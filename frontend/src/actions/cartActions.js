import axios from "axios"
import { ADD_CART_ITEM } from './../constants/cartConstants';


export const addToCart = (id, qty) => async (dispatch, getState) => {
  
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: ADD_CART_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty: qty,

    }
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

}