import React, { useEffect, useState, useReducer } from 'react'
import Axios from 'axios'
import { Button, Container, Table } from 'react-bootstrap'

import {BsFillPencilFill, BsCheck2Circle, BsXCircle, BsPlusSquareFill} from 'react-icons/bs'



export default function InventoryScreen() {

  const [tableProduct, EditTableProduct] = useState()
  const [products, setProducts] = useState([])


  useEffect(()=> {

   const getProducts = async()=> {
        const res = await Axios.get('/api/product/list')
        setProducts(res.data)
    }
    getProducts()
  }, [products])

  


  return (
   <Container fluid>
     <Table striped bordered hover className='my-2 w-100'>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Stock</th>
                <th>Price</th>
                <th className='d-flex justify-content-between'>Actions
                    <span>
                        <Button href='/sales' variant=''>
                           Add product <BsPlusSquareFill/>
                        </Button>
                    </span>
                </th>
            </tr>
        </thead>
        <tbody>
            {
                products.map((product)=>(
                    <tr key={product._id} product={product}>
                        <td>{product._id.slice(0, 6)}</td>
                        <td>{product.name}</td>
                        <td>{product.inStock}</td>
                        <td>{product.price}</td>
                        <td className='d-flex justify-content-end'>
                            <Button variant=''>                               
                               Edit <BsFillPencilFill/>
                            </Button>
                            <Button variant=''>
                               Delete <BsXCircle/>
                            </Button>
                            <Button variant=''>
                               Done <BsCheck2Circle/>
                            </Button>
                        </td>
                    </tr>
                    
                ))
            }
        </tbody>      
    </Table>
   </Container>
  )
}
