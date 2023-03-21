import React, { useEffect, useState, useReducer } from 'react'
import Axios from 'axios'
import { Table } from 'react-bootstrap'





export default function InventoryScreen() {

  const [tableProduct, EditTableProduct] = useState()
  const [products, setProducts] = useState([])


  useEffect(()=> {

   const getProducts = async()=> {
        const res = await Axios.get('/api/product/list')
        setProducts(res.data)
    }
    getProducts()
  }, [])

  


  return (
    <Table striped bordered hover className='my-2 w-100'>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Stock</th>
                <th>Price</th>
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
                    </tr>
                    
                ))
            }
        </tbody>      
    </Table>
  )
}
