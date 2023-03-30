import React, {useState, useReducer} from 'react'
import { Button, Form } from 'react-bootstrap'
import Axios from 'axios'
import {toast} from 'react-toastify'
import {getError} from '../utils/getError'



function reducer(state, action){
    switch(action.type){
        case 'ADD_PRODUCT':
            return{...state, loading: true, data: action.payload}
        case 'ADD_FAIL':
            return{...state, loading: false, error: action.payload}
        case 'ADD_SUCCESS':
            return{...state, loading: false}
        default:
            return state
    }
} 

export default function AddProduct() {

    const[{loading, error}, dispatch] = useReducer(reducer,{
        loading: false,
        error: ''
    })

    const [name, setName]= useState('');
    const [price, setPrice] = useState()
    const [inStock, setInStock] = useState()

    

    const createHandler = async(e)=> {
        e.preventDefault()
        try{
            dispatch({type: 'ADD_PRODUCT'})
            const {data} =  await Axios.post('/api/product/new-product', {
                name,
                price, 
                inStock
            })
            toast.success('product added successfully');
            dispatch({type: 'ADD_SUCCESS'})
            
        }catch(error){
            toast.error(getError(error))
            dispatch({type: 'ADD_FAIL'})
        }
    }


  return (
        <Form className='m-auto' onSubmit={createHandler}>
            <Form.Text>
                <h1>Add New Product</h1>
            </Form.Text>
            <Form.Group controlId='name'>
                <Form.Label>Add Name</Form.Label>
                <Form.Control 
                value={name}
                onChange={(e)=>setName(e.target.value)} 
                required ={true}
                />

            </Form.Group>
            <Form.Group controlId='price'>
                <Form.Label>Add Price</Form.Label>
                <Form.Control 
                onChange={(e)=>setPrice(e.target.value)} 
                value={price}
                required ={true}
                />
            </Form.Group>  
            <Form.Group controlId='inStock'>
                <Form.Label>Add Stock</Form.Label>
                <Form.Control 
                onChange={(e)=>setInStock(e.target.value)} 
                value={inStock}
                required ={true}
                />
            </Form.Group> 
            <Button variant='success' type='submit' className='my-4 w-100'>
                Done
            </Button>
        </Form>
  )
}
