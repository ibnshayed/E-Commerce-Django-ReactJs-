// import { Container } from 'react-bootstrap';
import { Container, makeStyles } from "@material-ui/core";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Footer from './components/materialui/Footer';
import Header from "./components/materialui/Header";
import { routes } from './routes/routes';
import NotFoundScreen from './screens/NotFoundScreen';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight:  'calc(100vh - 128px)',
  },
}))


const App = () => {
  
  const classes = useStyles();

  return (
    <Router>
      <Header />
      <main className={classes.root}>
        <Container maxWidth="lg">
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
