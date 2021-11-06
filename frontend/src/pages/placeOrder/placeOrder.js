import React, { useState } from "react";
import { Container, Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/message/message";
import { saveShippingAddress } from "../../actions/cartAction";
import CheckoutSteps from "../../components/checkoutSteps/checkoutSteps";
const PlaceOrder = () => {
    const cart = useSelector((state) => state.cartReducer);

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    cart.shippingPrice = addDecimals(cart.itemsPrice > 300 ? 0 : 100);
    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) 
      ).toFixed(2)
    const placeOrderHandler = () => {
        // dispatch(
        //   createOrder({
        //     orderItems: cart.cartItems,
        //     shippingAddress: cart.shippingAddress,
        //     paymentMethod: cart.paymentMethod,
        //     itemsPrice: cart.itemsPrice,
        //     shippingPrice: cart.shippingPrice,
        //     taxPrice: cart.taxPrice,
        //     totalPrice: cart.totalPrice,
        //   })
        // )
    };
    return (
        <Container>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:</strong>
                                Apartment {cart.shippingAddress.apartment},{cart.shippingAddress.street},
                                {cart.shippingAddress.city},{cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method:</strong>
                            {cart.PaymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>Your Cart is Empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link className="product-link" to={`/product/${item.id}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {/* <ListGroup.Item>{error && <Message variant="danger">{error}</Message>}</ListGroup.Item> */}
                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn-block"
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PlaceOrder;
