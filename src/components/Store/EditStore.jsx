import React from 'react'
import { Form, Button,  Modal } from 'semantic-ui-react'
import axios from "axios";

const EditStore = (props) => {
   const { openEditModal, toggleEditStoreModal, store, fetchStores} = props

  const handleChangeStore = (field, value) => {
      store[field] = value
  }

  const updateStore = () =>{
      const URL = "Stores/PutStore/" + store.id
      axios.put(URL, {
            id : store.id,
            name : store.name,
            address : store.address,
        })
        .then(({data}) => {
            console.log(data)
            fetchStores()
            toggleEditStoreModal(false, store)
          })
        .catch((err) => {
            console.log(err)
        })
  }

  return ( 
    <Modal open={openEditModal} dimmer='blurring'>
      <Modal.Header>Edit store</Modal.Header>
      <Modal.Content>
        <Form>
            <Form.Field>
                <label>NAME</label>
                <input  defaultValue={(store === null || store === undefined)? "" : store.name} onChange ={ (e) => handleChangeStore("name", e.target.value) } />
            </Form.Field>
            <Form.Field>
                <label>ADDRESS</label>
                <input defaultValue={(store === null || store === undefined)? "" : store.address} onChange ={ (e) => handleChangeStore("address", e.target.value) }/>
            </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => toggleEditStoreModal(false,store) }>
          Cancel
        </Button>
        <Button
          content="Update"
          labelPosition='right'
          icon='checkmark'
          onClick= {updateStore}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default EditStore