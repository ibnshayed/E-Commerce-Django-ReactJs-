import CartScreen from "../screens/CartScreen";
import HomeScreen from "../screens/HomeScreen";
import OrderScreen from "../screens/OrderScreen";
import PaymentScreen from "../screens/PaymentScreen";
import PlaceOrderScreen from "../screens/PlaceOrderScreen";
import ProductEditScreen from "../screens/product/ProductEditScreen";
import ProductListScreen from "../screens/product/ProductListScreen";
import ProductScreen from "../screens/product/ProductScreen";
import ShippingScreen from "../screens/ShippingScreen";
import LoginScreen from "../screens/user/LoginScreen";
import ProfileScreen from "../screens/user/ProfileScreen";
import RegisterScreen from "../screens/user/RegisterScreen";
import UserEditScreen from "../screens/user/UserEditScreen";
import UserListScreen from "../screens/user/UserListScreen";
import {
  ADMIN_PRODUCT_BY_ID_PATH,
  ADMIN_PRODUCT_LIST_PATH,
  ADMIN_USERLIST_PATH,
  ADMIN_USER_BY_ID_PATH,
  CART_PATH,
  HOME_PATH,
  LOGIN_PATH,
  ORDER_BY_ID_PATH,
  PAYMENT_PATH,
  PLACEORDER_PATH,
  PRODUCT_BY_ID_PATH,
  PROFILE_PATH,
  REGISTER_PATH,
  SHIPPING_PATH,
} from "./slug";

export const routes = [
  {
    path: HOME_PATH,
    component: HomeScreen,
    exact: true,
  },
  {
    path: LOGIN_PATH,
    component: LoginScreen,
    exact: false,
  },
  {
    path: REGISTER_PATH,
    component: RegisterScreen,
    exact: false,
  },
  {
    path: PROFILE_PATH,
    component: ProfileScreen,
    exact: false,
  },
  {
    path: ADMIN_USERLIST_PATH,
    component: UserListScreen,
    exact: false,
  },
  {
    path: ADMIN_USER_BY_ID_PATH,
    component: UserEditScreen,
    exact: false,
  },
  {
    path: PRODUCT_BY_ID_PATH,
    component: ProductScreen,
    exact: false,
  },
  {
    path: ADMIN_PRODUCT_LIST_PATH,
    component: ProductListScreen,
    exact: false,
  },
  {
    path: ADMIN_PRODUCT_BY_ID_PATH,
    component: ProductEditScreen,
    exact: false,
  },
  {
    path: SHIPPING_PATH,
    component: ShippingScreen,
    exact: false,
  },
  {
    path: PAYMENT_PATH,
    component: PaymentScreen,
    exact: false,
  },
  {
    path: PLACEORDER_PATH,
    component: PlaceOrderScreen,
    exact: false,
  },
  {
    path: ORDER_BY_ID_PATH,
    component: OrderScreen,
    exact: false,
  },
  {
    path: CART_PATH,
    component: CartScreen,
    exact: false,
  },

]