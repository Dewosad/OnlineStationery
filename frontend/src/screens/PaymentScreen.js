import React, {useState, useEffect} from 'react'
import {redirect, useLocation, useNavigate} from 'react-router-dom'
import { Form, Button, Container, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {savePaymentMethod} from '../actions/cartActions'

function PaymentScreen() {
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()

    const [PaymentMethod, setPaymentMethod] = useState('Cash On Delivery')

    if(!shippingAddress?.address){ //!shippingAddress.address
        navigate('/shipping')
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(PaymentMethod))
        navigate('/placeorder')
    }
      
  return (
    <Container>
        <CheckoutSteps step1 step2 step3/>

        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check 
                        type='radio'
                        label = 'Cash On Delivery'
                        id='cash'
                        name='paymentMethod'
                        checked
                        onChangeCapture={(e) => setPaymentMethod(e.target.value)}
                    >
                    </Form.Check>
                    </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </Container>
      
  )
}

export default PaymentScreen
