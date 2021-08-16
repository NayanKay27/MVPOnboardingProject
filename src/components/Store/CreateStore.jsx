import React, {useState} from 'react'
import { Form, Button,  Modal } from 'semantic-ui-react'
import axios from "axios";

const CreateStore = (props) => {
  const {open, toggleCreateStoreModal, fetchStores} = props

  const [store, setStore] = useState({
    name : "",
    address : "",
})

  const handleChangeStore = (field, value) => {
    setStore({
        ...store,
        [field]: value
    })        
  }

  const createStore = () =>{
        axios.post("Stores/PostStore", {
            name : store.name,
            address : store.address
        })
        .then(({data}) => {
            console.log(data)
            fetchStores()
            toggleCreateStoreModal(false)
          })
        .catch((err) => {
            console.log(err)
        })
  }

  return ( 
    <Modal open={open} dimmer='blurring'>
      <Modal.Header>Create store</Modal.Header>
      <Modal.Content>
        <Form>
            <Form.Field required>
                <label>NAME</label>
                {/* <input placeholder='First Name' onBlur ={ (e) => setStore(store.firstName = e.target.value) } /> */}
                <input  required placeholder='Please enter store name' onBlur ={ (e) => handleChangeStore("name", e.target.value) } />
            </Form.Field>
            <Form.Field required>
                      <label>ADDRESS</label>
                <input required placeholder='Please enter store address' onBlur ={ (e) => handleChangeStore("address", e.target.value) }/>
            </Form.Field>
            </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => toggleCreateStoreModal(false) }>
          Cancel
        </Button>
        <Button
          content="Create"
          labelPosition='right'
          icon='checkmark'
          onClick= {createStore}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default CreateStore