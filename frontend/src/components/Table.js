import React, {useState} from 'react'
import { Button, Table, Container } from 'react-bootstrap'

export default function TableComponent() {

    //{tableData = [], toEdit, toDelete}
    const [rows, setRowData] = useState([{id: '', name: '', price: Number, qty: Number, total: Number}])
    const [isEdit, setEdit] = useState(false)
   // const [showComfirm, setShowComfirm] = useState(false)



  const handleAdd = () => {
    setRowData([
        ...rows,
        {
            id: rows.length + 1, name: "",
            qty: Number, price: Number, total: Number
        }
    ])
    setEdit(true)
  }

  const handleEdit=()=>{
    setEdit(!isEdit)
  }

  const handleSave = () => {
     setEdit(!isEdit);
     setRowData(rows)     
  }

  const handleInputChange = (e, index) => {
    const {name, value} = e.target;
    const list = [...rows];
    list[index][name] = value;
    setRowData(list)

  }

  const handleRemove = (i) => {
    const list = [...rows]
    list.splice(i, 1)
    setRowData(list);
  }



  return (
<Container fluid>
   <div className='d-flex justify-content-between p-2'>
   <Button variant='' onClick={handleAdd}>
        Add
    </Button>
    <Button variant='' onClick={handleSave}>
        Done
    </Button>

   </div>
    <Table striped className='table'>
        <thead>
            <tr>
                <td>#</td>
                <th>Code</th>
                <th>Name</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {rows.map((element, i) => (
                    
                    <tr key={`tr-${element.id}`}>
                        <td>
                            <input
                            type='checkbox'
                            />
                        </td>
                        <td>CODE</td>
                        <td>
                            <input
                            type='text'
                            onChange={(e)=> handleInputChange(e, i)}
                            />
                        </td>
                        <td>
                        <input
                            type='text'
                            onChange={(e)=> handleInputChange(e, i)}
                            />
                        </td>
                        <td>{element.total}</td>
                        <td className='d-flex justify-content-end'>
                            <Button variant="light" className='mx-2' onClick={(e)=> handleEdit(e, element, i)}>
                                edit
                            </Button>{' '}
                            <Button variant='light' onClick={(e)=> handleRemove(e, element, i)}>
                                Delete
                            </Button>
                        </td> 
                    </tr>
            ))}
        </tbody>
    </Table>
</Container>
  )
}
