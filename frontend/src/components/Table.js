import React, {useState} from 'react'
import { Button, Table, Container } from 'react-bootstrap'

export default function TableComponent({tableData = [], toEdit, toDelete}) {

    const [data, setTableData ] = useState([])
    const [row, editRowData] = useState()





  return (
    <Container fluid>
   <div className='d-flex justify-content-between p-2'>
   <Button variant='success'>
        Add
    </Button>
    <Button variant='success'>
        Done
    </Button>

   </div>
    <Table striped variant='dark' className='table'>
        <thead>
            <tr>
                <th>{''}</th>
                <th>#</th>
                <th>Name</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {data.map((element, rowIndex)=>(
                    
                    <tr key={`tr-${rowIndex}`}>
                        <td>select</td>
                        <td>{element.name}</td>
                        <td>{element.qty}</td>
                        <td>{element.total}</td>
                        <td>
                            <Button variant="success" href='#' onClick={(e)=> toEdit(e, element, rowIndex)}>
                                edit
                            </Button>{' '}
                            <Button variant='success' href='#' onClick={(e)=> toDelete(e, element, rowIndex)}>
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
