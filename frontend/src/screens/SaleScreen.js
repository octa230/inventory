import React, {useContext, useEffect, useReducer, useState} from 'react'
import Chart from 'react-google-charts'
import {Container, Row, Col,} from 'react-bootstrap'
import AddProduct from '../components/AddProduct'
import TableComponent from '../components/Table'
import MessageBox from '../components/MessageBox'
import { Store } from '../utils/Store'
import { getError } from '../utils/getError'
import axios from 'axios'

function reducer(state, action){
  switch(action.type){
    case 'FETCH_REQUEST':
      return{...state, loading: true}
    case 'FETCH_SUCCESS':
      return {...state, summary: action.payload, loading: false}
    case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload}
    default:
      return state

  }
}

export default function SaleScreen() {

  const {state, dispatch: ctxDispatch} = useContext(Store)
  const {sale: {saleItems}} = state

  const updateSaleProduct = async(item, quantity)=>{
    const {data} = await axios.get(`/api/product/${item._id}`)
    if (data.inStock < quantity){
      window.alert('unit soldout')
      return
    }
    ctxDispatch({
      type: 'ADD_SALE_ITEM', payload: {...item, quantity}
    })
  }


  const dismissItem = (item)=> {
    ctxDispatch({type: 'REMOVE_SALE_ITEM', payload: item})
  } 
  const [{loading, summary, error}, dispatch] = useReducer(reducer, {
    loading: true,
    error: ''
  })



  useEffect(()=> {
    const fetchData = async ()=>  {
      try{
        dispatch({type: 'FETCH_REQUEST'})
        const {data} = await axios.get('/api/sales/summary')
        dispatch({type: 'FETCH_SUCCESS', payload: data})
      } catch(err){
        dispatch({type: 'FETCH_FAIL', payload: error})
      }
    }
    fetchData()
  })

  return (
    <Container>
      <Row>
      <Col sm='12' md='12' className='border'>
          <h2>Add Sale</h2>
          <TableComponent /> 
          
        </Col>
      </Row>
      <Row>
        <Col sm='12' md='4' className='border'>
          <AddProduct />
          
        </Col>
        <Col sm='12' md='8' className='border'>
          <div>
          <h2>Recorded Sales</h2>
          </div>
        
        </Col>
       
      </Row>
      
    </Container>
  )
}
