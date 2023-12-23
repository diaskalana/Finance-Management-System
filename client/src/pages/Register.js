import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, message } from 'antd';
import '../resources/authentication.css'
import axios from 'axios'
import Spinner from '../components/Spinner';

function Register() {
    const [loading, setLoading] = useState(false)
    const naviagate = useNavigate()

    const onFinish = async (values) => {
        try {
            setLoading(true)
            await axios.post('/api/users/register', values)
            setLoading(false)
            message.success('Registration Successfull')
            naviagate('/login')
        } catch (error) {
            message.error('Something went wrong')
            setLoading(false)
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
                <div className="col-md-5">
                    <div className='lottie'>
                        <lottie-player src="https://lottie.host/d1bda7d1-79e2-4896-9f22-63c9030b67a0/8DaTbGWeK5.json" background="transparent" speed="1" loop autoplay></lottie-player>
                    </div>
                </div>
                <div className="col-md-4 user-form">
                    <Form layout='vertical' onFinish={onFinish}>
                        <h1>👉 Create New Account</h1>
                        <hr />
                        <Form.Item label='Name' name='name' rules={[
                            {
                                required: true,
                                message: 'Please enter your name!'
                            }]}>
                            <Input placeholder='Enter full name' />
                        </Form.Item>

                        <Form.Item label='Email' name='email' rules={[
                            {
                                required: true,
                                message: 'Please enter your email!'
                            }]}>
                            <Input type='email' placeholder='Enter email' />
                        </Form.Item>

                        <Form.Item label='Password' name='password' rules={[
                            {
                                required: true,
                                message: 'Please enter your password!'
                            }]}>
                            <Input.Password placeholder='Enter password' />
                        </Form.Item>

                        <div className="d-flex justify-content-between align-items-center">
                            <Link to='/login'>Already Registered? Click here to login</Link>
                            <button className='primary' type='submit'>Register</button>
                        </div>

                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Register
