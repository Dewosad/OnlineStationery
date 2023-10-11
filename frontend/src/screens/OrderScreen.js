import React, {useState, useEffect} from 'react'
import {redirect, useLocation, useNavigate ,Link, useParams} from 'react-router-dom'
import { Form, Button, Container, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { getOrderDetails } from '../actions/orderActions'
import Loader from '../components/Loader'

function OrderScreen({match}) {
    const { id: orderId } = useParams();
    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, error, loading } = orderDetails;

    if (!loading && !error && order) {
        order.itemsPrice = order.orderItems.reduce(
            (acc, item) => acc + item.price * item.qty,
            0
        ).toFixed(2);
    }

    useEffect(() => {
        if (!order || order._id !== Number(orderId)) {
            dispatch(getOrderDetails(orderId));
        }
    }, [dispatch, order, orderId]);

  return loading ? (
    <Loader />
  ) : error ? (
    <h3 className='text-danger'>{error}</h3>
  ) : (
    <div>
        <h1>Order:{order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                <ListGroup.Item>
                        <h2>Shipping</h2>

                        <p>
                            <strong>Shipping:</strong>
                            {order.shippingAddress?.address}, {order.shippingAddress?.city}
                            {' '}
                            {order.shippingAddress?.postalCode},
                            {' '}
                            {order.shippingAddress?.country}
                        </p>

                        {order.isDelivered? (
                            <h3>Delivered On: {order.deliveredAt.substring(0,10)}</h3>
                        ) : (
                        
                            <h3 className='text-danger'>Not Delivered</h3> 
                        
                        )}
                    </ListGroup.Item>


                    <ListGroup.Item>
                        <h2>PaymentMethod</h2>

                        <p>
                            <strong>Method:</strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid? (
                            <h3>Paid on: {order.paidAt.substring(0,10)}</h3>
                        ) : (
                        
                            <h3 className='text-danger'>Not Paid</h3> 
                        
                        )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? <h3 className='text-danger'>Order is empty</h3>
                        : ( 
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index)=>(
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>

                                            <Col>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>

                                            <Col md={4}>
                                                {item.qty} X Rs.{item.price} = Rs.{(item.qty * item.price).toFixed(2)}
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
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Items:</Col>
                                <Col>Rs.{order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>Rs.{order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>Rs.{order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total Price:</Col>
                                <Col>Rs.{order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        {/* <ListGroup.Item>
                            {error && <h2 className='text-danger'>{error}</h2>}
                        </ListGroup.Item> */}

                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default OrderScreen
