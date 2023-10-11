import React, {useState, useEffect} from 'react'
import {redirect, useLocation, useNavigate ,Link} from 'react-router-dom'
import { Form, Button, Container, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
function PlaceOrderScreen() {
    const navigate = useNavigate()

    const orderCreate = useSelector(state => state.orderCreate)
    const {order, error, success} = orderCreate

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 5000 ? 0 : 100).toFixed(2)
    cart.taxPrice = Number((0.13) * cart.itemsPrice).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) +  Number(cart.taxPrice)).toFixed(2) 

    if(!cart.shippingAddress || !cart.paymentMethod){
        navigate('/shipping')
    }

    // if(!cart.paymentMethod){
    //     navigate('/payment')
    // }

    useEffect(() =>{
        if(success) {
            navigate(`/order/${order._id}`)
            dispatch({type: ORDER_CREATE_RESET })
        }
    },[success, navigate])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }
  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>

                        <p>
                            <strong>Shipping:</strong>
                            {cart.shippingAddress?.address}, {cart.shippingAddress?.city}
                            {' '}
                            {cart.shippingAddress?.postalCode},
                            {' '}
                            {cart.shippingAddress?.country}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>PaymentMethod</h2>

                        <p>
                            <strong>Method:</strong>
                            {cart.paymentMethod}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? <h3 className='text-danger'>Your cart is empty</h3>
                        : ( 
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item, index)=>(
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
                                <Col>Rs.{cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>Rs.{cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>Rs.{cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total Price:</Col>
                                <Col>Rs.{cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        {/* <ListGroup.Item>
                            {error && <h2 className='text-danger'>{error}</h2>}
                        </ListGroup.Item> */}

                        <ListGroup.Item className='text-center'>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cart.cartItems == 0}
                                onClick={placeOrder}
                            >
                                Place Order
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default PlaceOrderScreen
