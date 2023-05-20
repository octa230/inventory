import React, { useEffect, useState, useReducer, useContext} from 'react'
import {useParams} from 'react-router-dom'
import { Card, Row, Container, Form, Stack, Table, Button } from 'react-bootstrap'
import {FaPlusCircle, FaRedo} from 'react-icons/fa'
import axios from 'axios'
import {toast} from 'react-toastify'
import {getError} from '../utils/getError'
import { Store } from '../utils/Store'



const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_SALE_REQUEST':
        return { ...state, loading: true};
      case 'FETCH_SALE_SUCCESS':
        return { ...state, loading: false, sale: action.payload  };
      case 'FETCH_SALE_FAIL':
        return { ...state, loading: false, error: action.payload };
      case 'UPDATE_REQUEST':
        return { ...state, loadingUpdate: true, data: action.payload};
      case 'UPDATE_SUCCESS':
        return { ...state, loadingUpdate: false };
      case 'UPDATE_FAIL':
        return { ...state, loadingUpdate: false };
      case 'FETCH_PRODUCTS_REQUEST':
        return { ...state, loading: true};
      case 'FETCH_PRODUCTS_SUCCESS':
        return {...state, loading: false, products: action.payload.products};
      case 'UPLOAD_FAIL':
        return { ...state, loadingUpload: false, errorUpload: action.payload };
  
      default:
        return state;
    }
  };

export default function EditSaleDetails() {

const params = useParams()
const {id: saleId} = params;

const [selectedProducts, setSelectedProducts] = useState([]);
const [totalValue, setTotalValue] = useState(0);
const [code, setCode] = useState('')
const [arrangement, setArrangement] = useState('')

const [{ loading, error, sale, products}, dispatch] =
    useReducer(reducer, {
      sale:{},
      products:[],
      loading: true,
      error: '',
    });
    const {state} = useContext(Store)
    const {userInfoToken} = state

useEffect(()=> {
  const fetchData = async()=> { 
    dispatch({type: 'FETCH_SALE_REQUEST'})
      try{
          const {data} = await axios.get(`/api/multiple/get-sale/${saleId}`)
          dispatch({type: 'FETCH_SALE_SUCCESS', payload: data})
          setCode(data.InvoiceCode)
      } catch(error){
          dispatch({type: 'FETCH_SALE_FAIL', payload: getError(error)})
      }
  }
  getProducts()
  fetchData()
}, [saleId])


const getProducts = async()=> {
  dispatch({type: 'FETCH_PRODUCTS_REQUEST'})
  try{
    const {data} = await axios.get('/api/product/list')
    dispatch({type:"FETCH_PRODUCTS_SUCCESS", payload: data})
  } catch(error){
    toast.error(getError(error))
  }
}


const handleAddRow = () => {
  setSelectedProducts([...selectedProducts, { product: '', quantity: 0 }]);
};

const handleQuantityChange = (event, index) => {
  const quantity = event.target.value;
  const newSelectedProducts = selectedProducts.map((selectedProduct, i) => {
    if (i === index) {
      return { ...selectedProduct, quantity };
    } else {
      return selectedProduct;
    }
  });
  setSelectedProducts(newSelectedProducts);
};

const handleProductChange = (event, index) => {
  const product = event.target.value
  const newSelectedProducts = selectedProducts.map((selectedProduct, i)=> {
    if(i === index){
      return{...selectedProduct, product}
    }else{
      return selectedProduct
    }
  });
   setSelectedProducts(newSelectedProducts)
};


const handleNewTable = () => {
  setSelectedProducts([]);
  setTotalValue(0);
};
//send updated data to backend
const handleSave= async()=> {
 try{
  const {data} = await axios.post(`/api/multiple/${saleId}/add-units`, {
    selectedProducts, arrangement
   }) 
   toast.success('unit added successfully')
 }catch(error){
  toast.error(getError(error))
 }
console.log(selectedProducts, arrangement)
}

  return (
    <Container>
        <Row>
          <Stack direction='horizontal' gap={3}>
                <Card className='w-50'>
                    <Card.Title className='m-2'>code:{' '}{sale.InvoiceCode}</Card.Title>
                    <Form.Control type='text'
                    onChange={(e)=> setArrangement(e.target.value)}
                    name='arrangement'
                    placeholder='add arrangement'
                    />
                </Card>
                <Button onClick={handleAddRow}>
                    <FaPlusCircle/>
                </Button>
            <Table striped bordered hover className='mt-4'>
            <thead>
                <tr>
                    <th>product</th>
                    <th>quantity</th>
                </tr>
            </thead>
            <tbody>
                {selectedProducts.map((selectedProduct, index)=> (
                    <tr key={index}>
                        <td>
                            <Form.Label>product</Form.Label>
                            <Form.Select as="select"  value={selectedProduct.name} onChange={(e)=>handleProductChange(e, index)}>
                              <option value=""> ---select--- </option>
                                {products.map((product)=> (
                                  <option key={product._id} value={product.name}>
                                    {product.name}
                                  </option>
                                ))}
                            </Form.Select>
                        </td>
                        <td>
                        <Form.Label>quantity</Form.Label>
                        <Form.Control type='number' name='quantity' value={selectedProduct.quantity}
                        onChange={(e)=> handleQuantityChange(e, index)}
                        />
                        </td>
                      </tr>
                ))}
            </tbody>
          </Table>
          <Button onClick={handleSave}>Record</Button>
          <Button onClick={handleNewTable}>
            <FaRedo/>
          </Button>
          </Stack>
        </Row>  
    </Container>
  )
}
