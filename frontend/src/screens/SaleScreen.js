import React, {useState} from 'react'
import {Container, Row, Col, ButtonGroup, Button} from 'react-bootstrap'
import AddProduct from '../components/AddProduct'
import AddSale from '../components/AddSale'
import {useNavigate} from 'react-router-dom'
import TableComponent from '../components/Table'



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
        <Col sm='12' md='6' className='border mx-md-4'>
          <h2>Record</h2>
          <AddProduct />
          
        </Col>
        <Col sm='12' md='' className='border'>
          <h2>Add Sale</h2>
          <TableComponent /> 
          
        </Col>
      </Row>
      
    </Container>
  )
}
