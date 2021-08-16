import React from 'react'
import { Form, Button,  Modal } from 'semantic-ui-react'
import axios from "axios";

const EditProduct = (props) => {
    const { openEditProdModal, toggleEditProductModal, product, fetchProducts} = props

  console.log(product)

  const handleChangeProduct = (field, value) => {
      product[field] = value
  }

  const updateProduct = () =>{
      const URL = "Products/PutProduct/" + product.id
      axios.put(URL, {
            id : product.id,
            name : product.name,
            price : product.price,
        })
        .then(({data}) => {
            console.log(data)
            fetchProducts()
            toggleEditProductModal(false, product)
          })
        .catch((err) => {
            console.log(err)
        })
  }
    
  return ( 
    <Modal open={openEditProdModal} dimmer='blurring'>
      <Modal.Header>Edit product</Modal.Header>
      <Modal.Content>
        <Form>
            <Form.Field >
                <label>Name</label>
                <input  defaultValue={(product === null || product === undefined)? "" :product.name} onChange ={ (e) => handleChangeProduct("name", e.target.value) } />
            </Form.Field>
            <Form.Field >
                <label>Price</label>
                <input defaultValue={(product === null || product === undefined) ? "" : product.price} onChange ={ (e) => handleChangeProduct("price", e.target.value) }/>
            </Form.Field>
           </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => toggleEditProductModal(false, product) }>
          Cancel
        </Button>
        <Button
          content="Update"
          labelPosition='right'
          icon='checkmark'
          onClick= {updateProduct}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default EditProduct