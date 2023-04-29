import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Button, Card, Col, Container, ListGroup, Row} from 'react-bootstrap'
import { Store } from '../utils/Store'
import axios from 'axios'
import { getError } from '../utils/getError'
import { toast } from 'react-toastify'
import { useParams } from 'react-router'


function reducer(state, action){
    switch(action.type){
        case 'FETCH_REQUEST':
            return{...state, loading: true}
        case 'FETCH_SUCCESS':
            return{...state, sales: action.payload, loading: false}
        case 'FETCH_FAIL':
            return{...state, loading: false, error: action.payload}
        case 'INVOICE_REQUEST':
            return{...state, loading: true}
        case 'INVOICE_SUCCESS':
            return{...state, loading: false}
        case 'INVOICE_FAIL':
            return{...state, loading: false}
        default:
            return state
    }
}

export default function MultipleSaleHistory() {
   /*  const params = useParams()
    const {id: sale._id} = params */

    const {state} = useContext(Store)
    const [{sale, loading, error, sales}, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
        sales: []
    })

    useEffect(()=> {
        const fetchData =async()=> {
            dispatch({type: 'FETCH_REQUEST'});
            try{
                const {data} = await axios.get('/api/retail/multiple/list')
                dispatch({type: 'FETCH_SUCCESS', payload: data})
            }catch(error){
                dispatch({type: 'FETCH_FAIL', payload: error})
                toast.error(error)
            }
        }
        fetchData()
    }, [])

    const generateInvoice = async(sale)=> {
        try{
            dispatch({type: 'INVOICE_REQUEST'})
            const {data} = await axios.post(`/api/retail/multiple/make-invoice/${sale._id}`)
            dispatch({type: 'INVOICE_SUCCESS'})
        } catch(error){
            dispatch({type: 'INVOICE_FAIL'})
            toast.error(getError(error))
        }
    }
  return (
    <Container fluid>
        {sales?.map((sale)=> (
            <Row key={sale._id} className='d-flex justify-content-between align-items-center'>
                <Col className='p-3'>
                    {sale.saleItems.map((item)=>(
                        <Card md={6} sm={8} key={item.id}>
                        <Card.Title className='align-self-center'>{item.productName}</Card.Title>
                        <Card.Body>
                            <ListGroup>
                                <ListGroup.Item>
                                   price: {item.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                   quantity: {item.quantity}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  arrangement:  {item.arrangement}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  subtotal:  {sale.subTotal}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                        </Card>
                    ))}
                </Col>
                <Col>Invoice Code: {sale.InvoiceCode}</Col>
                <Col>prepapredBy: {sale.preparedBy}</Col>
                <Col>PaidBy: {sale.paidBy}</Col>
                <Col>Service: {sale.service}</Col>
                <Col>Date: {sale.createdAt.substring(0, 10)}</Col>
                <Col>
                <Button className='mt-2'>{sale? 'sucess': 'unsuccessfull'}</Button>
                </Col>
            </Row>
        ))}
      
    </Container>
  )
}
