import React, {useEffect, useState} from 'react'
import { Button, Table, Container, Form, Col, Row } from 'react-bootstrap'
import {BsFillBackspaceFill, BsFillPencilFill} from 'react-icons/bs'

export default function TableComponent() {

    const [rows, setRows] = useState([
        {id: 1, productName: '', price: Number, qty: Number, total: Number, arrangement: ''}
    ])
    const [isEdit, setEdit] = useState(false)
    const [disable, setDisable] = useState(false)
    const [open, setOpen] = useState()
    const [showComfirm, setShowComfirm] = useState(false)
    const [paidBy,  setPaidBy]= useState('')
    const [sevice, setService]= useState('')
    const [arrangement, setArrangement]= useState('')
    const [preparedBy, setPreparedBy]= useState('')
    const [productName, setproductName]= useState('')


 /*    const handleClose =(e, reason)=>{
        if(reason === 'clickaway'){
            return
        }
        setOpen(false)
    } */
    const handleAdd = ()=> {
    setRows([...rows,
        {id: rows.length + 1, name: "", arrangement: "", qty: Number, price: Number, total: Number}
    ])
    setEdit(true)
  }

  const handleEdit=(i)=>{
    setEdit(!isEdit)
  }

  const handleSave = () => {
     setEdit(!isEdit);
     setRows(rows);
     setDisable(true)
     setOpen(true)
     console.log("saved:", rows)     
  }

  const handleInputChange = (e, index) => {
    setDisable(false)
    const {name, value} = e.target;
    const list = [...rows];
    list[index][name] = value;
    setRows(list)

  }

  function handleSelectedValue(setState){
    return function(e){
      const selectedValue = e.target.value
      setState(selectedValue)
    }
  }

/*   const handleComfirm = ()=>{
    setShowComfirm(true)
  } */

  const handleRemove = (i) => {
    const list = [...rows]
    list.splice(i, 1)
    setRows(list)
    setShowComfirm(false)
  }
/*   const handleNo = ()=> {
    setShowComfirm(false)
  }

 */

  return (
<Container fluid>

    <div className='d-flex justify-content-between'>
    <Button variant='' onClick={handleAdd}>Add</Button>
    <div>
    <Form.Label>Arrangement</Form.Label>
    <Form.Select onChange={handleSelectedValue(setArrangement)}>
      <option>Select...</option>
      <option>Box</option>
      <option>Bouquet</option>
      <option>Vase</option>
      <option>Acrylic</option>
      <option>other</option>
    </Form.Select>
    </div>
    <div>
    <Form.Label>Paid By</Form.Label>
    <Form.Select onChange={handleSelectedValue(setPaidBy)}>
      <option>Select...</option>
      <option>Card</option>
      <option>Cash</option>
      <option>other</option>
    </Form.Select>
    </div>
    <div>
    <Form.Label>Service</Form.Label>
    <Form.Select onChange={handleSelectedValue(setService)}>
      <option>Select...</option>
      <option>Delivey</option>
      <option>Store Pick Up</option>
      <option>other</option>
    </Form.Select>
    </div>
    <div>
    <Form.Label>prepared By</Form.Label>
    <Form.Select onChange={handleSelectedValue(setPreparedBy)}>
      <option>choose..</option>
      <option>Mariam</option>
      <option>Allan</option>
      <option>Joe</option>
    </Form.Select>
    </div>
    <Button variant='' onClick={handleSave} className='mx-2'>save</Button>
    </div>
   <Table responsive striped className='my-3'>
    <thead>
        <tr>
            <th>#</th>
            <th>product name</th>
            <th>price</th>
            <th>quantity</th>
            <th>arrangement</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {rows.map((row, i)=> (
            <tr key={row.id}>
                <td>
                    <p>{row.id}</p>
                </td>
                <td>
                <Form.Control type='input' name='productName'
                onChange={(e)=> handleInputChange(e, i)}
                />
                </td>
                <td>
                <input type='input' name='price'
                onChange={(e)=> handleInputChange(e, i)}
                />
                </td>
                <td>
                <Form.Control type='input'
                onChange={(e)=> handleInputChange(e, i)}
                />
                </td>
                <td>
                <Form.Control type='input' name='quantity'
                onChange={(e)=> handleInputChange(e, i)}
                />
                </td>
                <td className='d-flex justify-content-between'>
                <Button onClick={handleEdit} variant=''>
                    <BsFillPencilFill/>
                </Button>
                <Button onClick={handleRemove} variant=''>
                    <BsFillBackspaceFill/>
                </Button>
                </td>
               
            </tr>

        ))}
    </tbody>
   </Table>
   <Button className='w-100 my-3' variant='success'>submit</Button>
</Container>
  )
}
