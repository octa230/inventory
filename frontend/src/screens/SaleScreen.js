import React, {useContext, useReducer} from 'react'
import {Container, Row, Col, ListGroup, Button, Card,} from 'react-bootstrap'
import AddProduct from '../components/AddProduct'
import TableComponent from '../components/Table'
import { Store } from '../utils/Store'
import { getError } from '../utils/getError'
import {BsDashSquareFill, BsFillPlusSquareFill, BsXSquareFill, BsTrash3Fill} from 'react-icons/bs'
import axios from 'axios'
import { toast } from 'react-toastify'

function reducer(state, action){
  switch(action.type){
    case 'CREATE_SALE_REQUEST':
      return{...state, loading: true}
    case 'CREATE_SALE_SUCCESS':
      return{...state, loading: false}
    case 'CREATE_SALE_FAIL':
      return{...state, loading: false}
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


  

  const [ {loading}, dispatch ] = useReducer(reducer, {
    loading: false,
    error: ''
  })


  const {state, dispatch: ctxDispatch} = useContext(Store)
  const {sale, sale:{saleItems}, userInfoToken} = state



  const updateSaleProduct = async(item, quantity)=> {
    const {data} = await axios.get(`/api/product/${item._id}`)
    if (data.inStock < quantity){
      window.alert('unit soldout')
      return
    }
    ctxDispatch({
      type: 'ADD_SALE_ITEM', payload: {...item, quantity}
    })
  }

  const RoundTo = (num)=> Math.round(num * 100 + Number.EPSILON) / 100 //====> 123.4567 - 123.45;
  sale.itemsPrice = RoundTo(sale.saleItems.reduce((a, c)=> a+ c.quantity * c.price, 0))
  sale.taxPrice = RoundTo(0.15 * sale.itemsPrice)
  sale.totalPrice = sale.itemsPrice + sale.taxPrice;

  const makeSale = async()=>{
    try{
      dispatch({type: 'CREATE_SALE_REQUEST'})
      const {data} = await axios.post('/api/sales/make-sale', {
        saleItems: sale.saleItems,
        taxPrice: sale.taxPrice,
        itemsPrice: sale.itemsPrice,
        totalPrice: sale.totalPrice,
        //soldBy: sale.soldBy
      },
      {
        headers:{Authorization: `Bearer${userInfoToken.token}`}
      }
      )
      ctxDispatch({type: 'CLEAR_SALE_ITEMS'})
      dispatch({type: 'CREATE_SALE_SUCCESS'});
      localStorage.removeItem('saleItems')
      toast.success('sale added to History')
    }catch(err){
      dispatch({type: 'CREATE_SALE_FAIL'})
      toast.error(getError(err))
    }
  }

  const dismissItem = (item)=> {
    ctxDispatch({type: 'REMOVE_SALE_ITEM', payload: item})
  } 


  const deleteAllItems= ()=> {
    if(window.confirm('dismiss all items?')){
      ctxDispatch({type:'CLEAR_SALE_ITEMS', payload: saleItems})
    }
  }




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
        <div className='d-flex justify-content-between'>
        <h2>Recorded</h2>
        <span className='p-2' onClick={()=> deleteAllItems()}>clear all units {' '} <BsTrash3Fill/></span>
        </div>
          <ListGroup>
            {saleItems?.map((item)=> (
              <ListGroup.Item key={item._id}>
                <Row className='align-items-center'>
                  <Col md={4}>
                  <h4>{item.name}</h4>
                  </Col>
                  <Col md={3}>
                    <Button onClick={()=> updateSaleProduct(item, item.quantity - 1)}
                    variant='light'
                    disabled={item.quantity === 1}
                    >
                      <BsDashSquareFill/>
                    </Button>{' '}
                    <span>{item.quantity}</span>{' '}

                    <Button onClick={()=> updateSaleProduct(item, item.quantity + 1)}
                    variant='light'
                    disabled={item.quantity === item.inStock}
                    >
                      <BsFillPlusSquareFill/>
                    </Button>{' '}
                  </Col>
                  <Col md={3}>{item.price.toLocaleString(undefined, {maximumFractionDigits: 2})}</Col>
                  <Col md={2}>
                    <Button onClick={()=> dismissItem(item)} variant='light'>
                      <BsXSquareFill/>
                    </Button>
                  </Col>
                </Row>

              </ListGroup.Item>
            ))}
          
          </ListGroup>       
        </Col>
      </Row>
      <Row className='mt-4'>
        <Col>
        <Card>
          <Card.Body>
            <ListGroup variant='flush'>
              <ListGroup.Item>
              <Row>
                <Col>Units</Col>
                <Col>AED: {sale.itemsPrice.toFixed(2).toLocaleString(undefined, {maximumFractionDigits: 2})}</Col>
              </Row>
              </ListGroup.Item>
              <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>AED: {sale.taxPrice.toFixed(2).toLocaleString(undefined, {maximumFractionDigits: 2})}</Col>
              </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <h3>
                  SubTotal: ({saleItems.reduce((a, c)=> a+c.quantity, 0)}{' '}: units)
                  AED: {saleItems.reduce((a, c)=> a + c.price * c.quantity, 0).toLocaleString(undefined, {maximumFractionDigits: 2})}
                </h3>

              </ListGroup.Item>
              <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>AED: {sale.totalPrice.toFixed(2).toLocaleString(undefined, {maximumFractionDigits: 2})}</Col>
              </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className='d-grid'>
                    <Button type='button' variant='danger' disabled={saleItems.length === 0} onClick={makeSale}>
                      Confirm Sale
                    </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
        </Col>
      </Row>
      
    </Container>
  )
}
