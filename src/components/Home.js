import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';

class Home extends Component {
 
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };
  render() {
    const { isLoggingOut, logoutError } = this.props;

    return (
<div>
<div>
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="/">Pizzaroo</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link active href="/">Orders</Nav.Link>
      <NavDropdown title="Account" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#2">Account details</NavDropdown.Item>
        <NavDropdown.Item href="#3">Change email address</NavDropdown.Item>
        <NavDropdown.Item href="#4">Change password</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#5">Help</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link eventKey="disabled" disabled>Menu</Nav.Link>
    </Nav>
    <Nav>
      <Nav.Link onClick={this.handleLogout}>Logout</Nav.Link>
	{isLoggingOut && <p>Logging Out....</p>}
        {logoutError && <p>Error logging out</p>}
    </Nav>
  </Navbar.Collapse>
</Navbar>
</div>
        <div>
        <Container>
        <Form.Switch
            id="custom-switch"
            label="Open restaurant"
                />
        <Row>
        <Col>
        <Card style={{ width: '18rem', margin: '5%' }}>
        <Card.Body>
        <Card.Title>Pending Orders</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">6</Card.Subtitle>
            </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card style={{ width: '18rem', margin: '5%' }}>
        <Card.Body>
        <Card.Title>Completed Orders</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">4</Card.Subtitle>
            </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card style={{ width: '18rem', margin: '5%' }}>
        <Card.Body>
        <Card.Title>Total Orders</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">10</Card.Subtitle>
            </Card.Body>
            </Card>
            </Col>
            </Row>
            <NavDropdown.Divider />
            </Container>
            </div>
            <div>
            <Container style={{marginTop: 30}}>
        <Accordion defaultActiveKey="2">
        <Card>
        <Accordion.Toggle as={Card.Header} eventKey="2">
            On Deck
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="2">
            <Card.Body>
            <Row>

        <Toast>
        <Toast.Header closeButton={false}>
            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
            <strong className="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
        <Toast>
        <Toast.Header closeButton={false}>
            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
            <strong className="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
        </Row>
        </Card.Body>
        </Accordion.Collapse>
        </Card>
        </Accordion>
        <Accordion defaultActiveKey="0">
        <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
            Pending Orders
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
            <Card.Body>
            <Row>
        <Toast>
        <Toast.Header closeButton={false}>
            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
            <strong className="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
        <Toast>
        <Toast.Header closeButton={false}>
            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
            <strong className="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
        <Toast>
        <Toast.Header closeButton={false}>
            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
            <strong className="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
        <Toast>
        <Toast.Header closeButton={false}>
            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
            <strong className="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
        </Row>
        </Card.Body>
        </Accordion.Collapse>
        </Card>
        </Accordion>
        <Accordion defaultActiveKey="1">
        <Card>
        <Accordion.Toggle as={Card.Header} eventKey="1">
            Completed Orders
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
            <Card.Body>
            <Row>
            <Toast>
            <Toast.Header closeButton={false}>
            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
            <strong className="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
        <Toast>
        <Toast.Header closeButton={false}>
            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
            <strong className="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
        <Toast>
        <Toast.Header closeButton={false}>
            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
            <strong className="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
        <Toast>
        <Toast.Header closeButton={false}>
            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
            <strong className="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
        <Toast>
        <Toast.Header closeButton={false}>
            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
            <strong className="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
        </Row>
        </Card.Body>
        </Accordion.Collapse>
        </Card>
        </Accordion>

        </Container>
        </div>
</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError
  };
}

export default connect(mapStateToProps)(Home);
