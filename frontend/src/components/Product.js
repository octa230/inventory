/* import React, { useContext } from 'react'
import { ListGroupItem } from 'react-bootstrap'
import { Store } from '../utils/Store';
import { toast } from 'react-toastify';

export default function Product(props) {
  const {product} = props;

  const {state, dispatch: ctxDispatch} = useContext(Store)
  const {sale: {saleItems}} = state;


  async function addSaleItem(item){
    toast.success('added')
    const existItem = saleItems.find((x)=> x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const {data} = await axios.get(`/api/product/${item._id}`)

    if(data.inStock < quantity){
      window.alert('product out sold');
      return
    }
    ctxDispatch({
      type: 'ADD_SALE_ITEM',
      payload: {...item, quantity}

    })
  }

  return (
    <ListGroupItem>
      
    </ListGroupItem>
  )
}
 */