import React, {useState, useCallback, useMemo, useEffect} from 'react'
import {Button, Form} from 'react-bootstrap'
import Select from 'react-select'
import TableComponent from './Table'
import { Axios } from 'axios'
import { toast } from 'react-toastify'

export default function AddSale(){

    let data = []
    const [selectedOptions, setSelectedOptions]= useState()
    const [createModelOpen, setCreateModelOpen] = useState(false)
    const [tableData, setTableData] = useState(()=> data)
    const [validationErrors, setValidationErrors ] = useState({})
    //const [data, setData] = useState([])

    function handleCreateNewRow(values){
        tableData.push(values)
        setTableData([...tableData])
    }
    function handlesaveRowEdit({exitEditingMode, row, values}){
        if(!Object.keys(validationErrors).length){
            tableData[row.index] = values;
            setTableData([...tableData])
            exitEditingMode()
        }

    }

    function handleCancelRowEdit(){
        setValidationErrors({})
    }

   useEffect(()=> {
    const getProducts = async()=> {
        try{
         data = await Axios.get('/api/product/list')
        } catch(err){
            toast.error(err)
        }
    }
    getProducts()
   }, [])
   
    //value label

    const optionList = [data]
    function handleSelection(data){
        setSelectedOptions(data)
    }

  return (
        <Form className='m-auto pb-3'>
            <Form.Text>
                <h2>Record New Sale</h2>
            </Form.Text>

            <Form.Group className='mt-2'>
            <Select
            options={optionList}
            placeholder={'Select Product'}
            value={selectedOptions}
            onChange={handleSelection}
            isSearchable={true}
            isMulti
            />
            </Form.Group>

            <Form.Group className='mt-4'>
                <Form.Select aria-label='pcs'>
                    <option>Select Number</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className='mt-2'>
            <Form.Check
                type='switch'
                id='custom-switch'
                label='paid'
                />
                <Form.Check
                type='switch'
                id='custom-switch'
                label='create invoice'
                />
            </Form.Group>
            <div className='d-flex my-3'>
                <Button>Add</Button>
                <Button className='sale-btn'>Save</Button>
                <Button className='sale-btn'>Done</Button>
                <Button className='sale-btn'>undo</Button>

            </div>
            <TableComponent />
        </Form>
        
  )
}
