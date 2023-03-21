import { Axios } from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { getError } from '../utils/getError';
import { Store } from '../utils/Store';
import { useNavigate } from 'react-router';

export default function RegisterUser() {

    const navigate = useNavigate()

    const [name, setName ]= useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setComfirmPassword] = useState('')


    const {state, dispatch: ctxDispatch} = useContext(Store)
    const { userInfoToken } = state

    async  function submitHandler(){
        e.preventDefault()

        if(password !== confirmPassword){
            toast.error('passwords don \'t match')
            return
        }

        try{
            const {data} = await Axios.post('/api/user/register', {
                name,
                password,
                confirmPassword
            })
            ctxDispatch({type: 'SIGN_IN', payload: data})
            localStorage.setItem('userInfoToken', JSON.stringify(data))
        
        }catch(err){
            toast.error(getError(err))
        }
    }
  return (
    <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
            <Form.Label>username</Form.Label>
            <Form.Control 
            type='input'
            value={name}
            required
            onChange={(e)=> setName(e.target.value)}
            />
        </Form.Group>
        <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control 
            type='input'
            value={password}
            required
            onChange={(e)=> setPassword(e.target.value)}
            />
        </Form.Group>
        <Form.Group controlId='confirm-password'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
            type='input'
            value={confirmPassword}
            required
            onChange={(e)=> setComfirmPassword(e.target.value)}
            />
        </Form.Group>
        <Button type='submit' w-full variant='success'>submit</Button>
      
    </Form>
  )
}
