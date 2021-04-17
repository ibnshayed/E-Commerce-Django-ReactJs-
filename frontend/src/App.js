import { Container } from 'react-bootstrap';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Footer from './components/Footer';
import Header from "./components/Header";
import { routes } from './routes/routes';
import NotFoundScreen from './screens/NotFoundScreen';


const  App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            {routes.map((route, index) => (
              <Route key={index}
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            ))}
            <Route component={NotFoundScreen}/>
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
