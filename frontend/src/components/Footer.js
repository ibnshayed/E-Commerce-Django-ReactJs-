
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return ( 
        <footer className="bg-dark text-light">
            <Container>
                <Row>
                    <Col className="text-center py-3">Copyright &copy; E-Commerce App</Col>
                </Row>
            </Container>
        </footer>
     );
}
 
export default Footer;
