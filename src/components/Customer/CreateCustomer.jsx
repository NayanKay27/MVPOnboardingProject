import React, {useState} from 'react'
import { Form, Button,  Modal } from 'semantic-ui-react'
import axios from "axios";

const CreateCustomer = (props) => {
  const {open, toggleCreateCustomerModal, fetchCustomers} = props

  const [customer, setCustomer] = useState({
    firstName : "",
    address : "",
    email : ""
  })

  const handleChangeCustomer = (field, value) => {
    setCustomer({
        ...customer,
        [field]: value
    })        
  }

  const createCustomer = () =>{
        axios.post("Customers/PostCustomer", {
            name : customer.name,
            address : customer.address,
            emailid : customer.emailid,
        })
        .then(({data}) => {
            console.log(data)
            fetchCustomers()
            toggleCreateCustomerModal(false)
          })
        .catch((err) => {
            console.log(err)
        })
  }

  return ( 
    <Modal open={open} dimmer='blurring'>
      <Modal.Header>Create customer</Modal.Header>
      <Modal.Content>
        <Form>
            <Form.Field required>
                <label>FIRSTNAME</label>
                <input placeholder='First Name' onBlur ={ (e) => handleChangeCustomer("name", e.target.value) } />
            </Form.Field>
            <Form.Field required>
                <label>ADDRESS</label>
                <input placeholder='Address' onBlur ={ (e) => handleChangeCustomer("address", e.target.value) }/>
            </Form.Field>
            <Form.Field>
                <label>EMAIL</label>
                <input placeholder='joe@xyz.com' onBlur ={ (e) => handleChangeCustomer("emailid", e.target.value) } />
            </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => toggleCreateCustomerModal(false) }>
          Cancel
        </Button>
        <Button
          content="Create"
          labelPosition='right'
          icon='checkmark'
          onClick= {createCustomer}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default CreateCustomer