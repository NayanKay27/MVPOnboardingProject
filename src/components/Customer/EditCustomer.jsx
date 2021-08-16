import React from 'react'
import { Form, Button,  Modal } from 'semantic-ui-react'
import axios from "axios";

const EditCustomer = (props) => {
  const { openEditCustModal, toggleEditCustomerModal, customer, fetchCustomers} = props

  const handleChangeCustomer = (field, value) => {
      customer[field] = value
  }

  const updateCustomer = () =>{
      const URL = "Customers/PutCustomer/" + customer.id
      axios.put(URL, {
            id : customer.id,
            name : customer.name,
            address : customer.address,
            emailid : customer.emailId,
        })
        .then(({data}) => {
            console.log(data)
            fetchCustomers()
            toggleEditCustomerModal(false, customer)
          })
        .catch((err) => {
            console.log(err)
        })
  }

  return ( 
    <Modal open={openEditCustModal} dimmer='blurring'>
      <Modal.Header>Edit customer</Modal.Header>
      <Modal.Content>
        <Form>
            <Form.Field>
                <label>First Name</label>
                <input  defaultValue={(customer === null || customer=== undefined) ? "" : customer.name} onChange ={ (e) => handleChangeCustomer("name", e.target.value) } />
            </Form.Field>
            <Form.Field>
                <label>Address</label>
                <input defaultValue={(customer === null || customer === undefined)? "": customer.address} onChange ={ (e) => handleChangeCustomer("address", e.target.value) }/>
            </Form.Field>
            <Form.Field>
                <label>Email</label>
                <input defaultValue={(customer === null || customer === undefined)? "":customer.emailId} onChange ={ (e) => handleChangeCustomer("emailId", e.target.value) } />
            </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => toggleEditCustomerModal(false,customer) }>
          Cancel
        </Button>
        <Button
          content="Update"
          labelPosition='right'
          icon='checkmark'
          onClick= {updateCustomer}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default EditCustomer