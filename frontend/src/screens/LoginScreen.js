import React from 'react'
import {Button, Form} from 'react-bootstrap'

export default function LoginScreen() {
  return (
    <Form className='w-50 m-auto p-5'>
    <Form.Text className='h-2'>LOGIN </Form.Text>
      <Form.Group className='mb-3' controlId='loginForm'>
        <Form.Label>username</Form.Label>
        <Form.Control type='username' placeholder='username'/>
      </Form.Group>

      <Form.Group className='mb-3' controlId='loginForm'>
        <Form.Label>Pass-key</Form.Label>
        <Form.Control type='password' placeholder='password'/>
      </Form.Group>
      <Button type='submit' variant='warning' className='w-100'>
        login
      </Button>
    </Form>
  )
}
