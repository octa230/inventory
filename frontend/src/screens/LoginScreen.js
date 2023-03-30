import React, { useContext, useEffect, useState } from 'react'
import {Button, Form} from 'react-bootstrap'
import Axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../utils/getError';
import { Store } from '../utils/Store';




export default function LoginScreen() {

  const navigate = useNavigate();
  const {search} = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/sales';


  const [userName, setUserName ] = useState('')
  const [password, setPassword ] = useState('')

  const {state, dispatch: ctxDispatch} = useContext(Store)
  const {userInfoToken} = state  

  const loginHandler = async(e)=>{
    e.preventDefault()
    try{
      const {data} = await Axios.post('/api/user/login', {
        userName,
        password
      })
      ctxDispatch({type: 'SIGN_IN', payload: data})
      localStorage.setItem('userInfoToken', JSON.stringify(data))
      navigate(redirect || '/register')
      toast.success('Welcome')
    } catch(err) {
      toast.error(getError(err))
    }
  }

  useEffect(()=>{
    if(userInfoToken){
      navigate(redirect)
    }
  }, [navigate, redirect, userInfoToken])


  return (
    <Form className='w-50 m-auto pt-4' onSubmit={loginHandler}>
    <Form.Text className='h-2'>LOGIN </Form.Text>
      <Form.Group className='mb-3' controlId='username'>
        <Form.Label>username</Form.Label>
        <Form.Control value={userName} type='username' placeholder='username' onChange={(e)=> setUserName(e.target.value)}/>
      </Form.Group>

      <Form.Group className='mb-3' controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control value={password} type='password' placeholder='password' onChange={(e)=> setPassword(e.target.value)}/>
      </Form.Group>
      <Button type='submit' variant='warning' className='w-100'>
        login
      </Button>
    </Form>
  )
}
