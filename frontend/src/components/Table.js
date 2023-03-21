import React, {useState} from 'react'
import { Button, Table } from 'react-bootstrap'

export default function TableComponent({tableData = [], toEdit, toDelete}) {

  return (
    <Table striped variant='dark' className='table'>
        <thead>
            <tr>
                <th>Name</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {tableData.map((element, rowIndex)=>{
                return(
                    <tr key={`tr-${rowIndex}`}>
                        <td>{element.name}</td>
                        <td>{element.qty}</td>
                        <td>{element.total}</td>
                        <td>
                            <Button href='#' onClick={(e)=> toEdit(e, element, rowIndex)}>
                                edit
                            </Button>{' '}
                            <Button href='#' onClick={(e)=> toDelete(e, element, rowIndex)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
    </Table>
  )
}
