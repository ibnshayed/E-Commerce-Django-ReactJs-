import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import {
    orderCreateReducers,
    orderDeliverReducers,
    orderDetailsReducers,
    orderListAdminReducers,
    orderListMyReducers,
    orderPayReducers
} from './reducers/orderReducers';
import {
    productCreateReducers,
    productDeleteReducers,
    productDetailsReducers,
    productListReducers,
    productReviewCreateReducers,
    productUpdateReducers
} from './reducers/productReducers';
import {
    userDeleteReducers,
    userDetailsReducers,
    userListReducers,
    userLoginReducers,
    userRegisterReducers,
    userUpdateProfileReducers,
    userUpdateReducers
} from './reducers/userReducers';


const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    productUpdate: productUpdateReducers,
    productDelete: productDeleteReducers,
    productCreate: productCreateReducers,
    productReviewCreate: productReviewCreateReducers,

    cart: cartReducer,

    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,
    userDetails: userDetailsReducers,
    userUpdateProfile: userUpdateProfileReducers,
    userList: userListReducers,
    userDelete: userDeleteReducers,
    userUpdate: userUpdateReducers,

    orderCreate: orderCreateReducers,
    orderDetails: orderDetailsReducers,
    orderPay: orderPayReducers,
    orderListMy: orderListMyReducers,
    orderListAdmin: orderListAdminReducers,
    orderDeliver: orderDeliverReducers,
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : [];

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {};


const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)));


export default store;