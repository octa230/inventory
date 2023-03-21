import React, {useState} from 'react'
import {Container, Row, Col, ButtonGroup, Button} from 'react-bootstrap'
import AddProduct from '../components/AddProduct'
import AddSale from '../components/AddSale'
import {useNavigate} from 'react-router-dom'



export default function SaleScreen() {

  const navigate = useNavigate()
  return (
    <Container fluid>
      <Row className='p-4'>
        <Col sm='12' md='2' className='border'>
          <h2>Actions</h2>
          <div>
          <ButtonGroup vertical className='p-2 w-100'>
            <Button className='mt-2' variant='warning'>Add sale{' '}+</Button>
            <Button className='mt-2' variant='warning'>Delete</Button>
            <Button className='mt-2' variant='warning'>Make Invoice</Button>
            <Button className='mt-2' variant='warning'>Log Out</Button>
            <Button className='mt-2' variant='warning' onClick={()=> navigate('/inventory')}>Inventory</Button>
          </ButtonGroup>
          </div>
        </Col>
        <Col sm='12' md='6' className='border'>
          <h2>Record</h2>
          <AddProduct />
          <AddSale />
        </Col>
        <Col sm='12' md='4' className='border'>
          <h2>Sales</h2>
          
        </Col>
      </Row>
      
    </Container>
  )
}
