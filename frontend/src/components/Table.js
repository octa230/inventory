import React, {useState} from 'react'
import { Button, Table, Container, Form} from 'react-bootstrap'
import axios from 'axios'
import { toast } from 'react-toastify'


export default function TableComponent() {

    const [rows, setRows] = useState([{
        id: 1, 
        productName: '', 
        price: Number, 
        quantity: 0, 
        subTotal: 0, 
        arrangement: ''
      }
    ])
    const [isEdit, setEdit] = useState(false)
    const [paidBy,  setPaidBy]= useState('')
    const [service, setService]= useState('')
    const [preparedBy, setPreparedBy]= useState('')
    const [subTotal, setsubTotal] = useState(0)
    


 /*    const handleClose =(e, reason)=> {
        if(reason === 'clickaway'){
            return
        }
        setOpen(false)
    } */
    const handleAdd = ()=> {
    setRows([...rows, {id: rows.length + 1, productName: "", arrangement: "", quantity: Number, price: Number, subTotal: Number}])
    setEdit(true)
  }

  const handleEdit=(i)=> {
    setEdit(!isEdit)
  }

  async function handleSave(){
     setEdit(!isEdit);
     
     try{
      setRows(rows);
      const {data} = await axios.post('/api/retail/multiple/new-sale', {
        rows, paidBy, preparedBy, service
       })
     }catch(error){
      toast.error(error)
     }
     console.log("saved:", rows, paidBy, preparedBy, service)  
  }

  const handleInputChange = (e, index)=> {
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
    <div>
      <span>Total:{subTotal}</span>
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
            <th>sub-Total</th>
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
                <Form.Control type='input' name='quantity'
                onChange={(e)=> handleInputChange(e, i)}
                />
                </td>
                <td>
                <Form.Control type='input' name='arrangement'
                onChange={(e)=> handleInputChange(e, i)}
                />
                </td>
                <td>
                <Form.Control type='input' name='subTotal'
                onChange={(e)=> handleInputChange(e, i)}
                />
                </td>
            </tr>

        ))}
    </tbody>
   </Table>
   <Button className='w-100 my-3' variant='success'>submit</Button>
</Container>
  )
}
