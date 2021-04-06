import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from './components/Footer';
import Header from "./components/Header";
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/product/ProductListScreen';
import ProductEditScreen from './screens/product/ProductEditScreen';
import ProductScreen from './screens/product/ProductScreen';
import ShippingScreen from './screens/ShippingScreen';
import LoginScreen from './screens/user/LoginScreen';
import ProfileScreen from './screens/user/ProfileScreen';
import RegisterScreen from './screens/user/RegisterScreen';
import UserEditScreen from './screens/user/UserEditScreen';
import UserListScreen from './screens/user/UserListScreen';


const  App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact/>
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />

          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id" component={UserEditScreen} />

          <Route path="/admin/productlist" component={ProductListScreen} />
          <Route path="/admin/product/:id" component={ProductEditScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
