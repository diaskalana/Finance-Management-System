import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, message } from 'antd';
import '../resources/authentication.css'
import axios from 'axios'
import Spinner from '../components/Spinner';

function Login() {
    const [loading, setLoading] = useState(false)
    const naviagate = useNavigate()

    const onFinish = async (values) => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/login', values)
            localStorage.setItem('Lab-Management-User', JSON.stringify({ ...response.data, password: '' }))
            setLoading(false)
            message.success('Login Successfull')
            naviagate('/')

        } catch (error) {
            setLoading(false)
            message.error("Login failed")
        }
    }

    useEffect(() => {
        if (localStorage.getItem('Lab-Management-User')) {
            naviagate('/')
        }
    }, [])

    return (
        <div className='register'>
            {loading && <Spinner />}
            <div className="row justify-content-center align-items-center w-100 h-100">
                <div className="col-md-4 user-form">
                    <Form layout='vertical' onFinish={onFinish}>
                        <h1>👋 Good to see you again!</h1>
                        <hr />

                        <Form.Item label='Email' name='email' rules={[
                            {
                                required: true,
                                message: 'Please enter your email!'
                            }]}>
                            <Input type='email' placeholder='Enter email' />
                        </Form.Item>

                        <Form.Item label='Password' name='password'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter the password!'
                                }]}>
                            <Input.Password placeholder='Your password' />
                        </Form.Item>

                        <div className="d-flex justify-content-between align-items-center">
                            <Link to='/register'>Not Registered Yet? Click here to register</Link>
                            <button className='primary' type='submit'>Login</button>
                        </div>

                    </Form>
                </div>
                <div className="col-md-5">
                    <div className='lottie'>
                        <lottie-player src="https://lottie.host/f58fae94-576b-413d-aed1-080261b6664d/FmgyNjDCCo.json" background="transparent" speed="1" loop autoplay></lottie-player>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
