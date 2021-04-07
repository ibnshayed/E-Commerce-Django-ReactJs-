import { Col, Row } from "react-bootstrap"


const NotFoundScreen = () => {
  return (
    <Row className="align-items-center" style={{height: 'calc(100vh - 175px)'}}>
      <Col>
        <div className="display-1 text-center font-weight-bolder">
          Not Found 404
        </div>
      </Col>
    </Row>
  )
}

export default NotFoundScreen
