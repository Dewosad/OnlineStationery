import React, {useState, useEffect} from 'react'
import {Link, redirect, useLocation, useNavigate} from 'react-router-dom'
import { Form, Button, Row, Col, Container} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from "../components/Loader"
import Message from "../components/Message"
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'


function LoginScreen() {
    const location = useLocation()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)

    const{loading, error, userInfo } = userLogin

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    },[navigate, userInfo, redirect])

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(login(email, password))
    }
  return (
    <Container>
        <h1>Sign In</h1>
        {error && <h3 className='text-danger'>{error}</h3>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
            </Form.Group>

            <Button type='submit' variant='primary'>Sign In</Button>

        </Form>

        <Row className='py-3'>
            <Col>
                Don't have an account? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
            </Col>
        </Row>
    </Container>
  )
}

export default LoginScreen
