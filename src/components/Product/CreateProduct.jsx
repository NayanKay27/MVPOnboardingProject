import React, {useState} from "react";
import { Form, Button, Modal, ModalContent, ModalHeader, FormField } from 'semantic-ui-react'
import axios from "axios";

const CreateProduct = (props) => {
    const { openWindow, toggleCreateProductModal, fetchProducts } = props

    const [product, setProduct] = useState({
        name: '',
        price: 0
    })

    const handleChangeProduct = (field, value) => {
        setProduct({
            ...product,
            [field]: value
        })
    }

    const createProduct = () => {
        axios.post("Products/PostProduct",{
            name : product.name,
            price : product.price
        })
        .then( ({data}) => {
            console.log(data)
            fetchProducts()
            toggleCreateProductModal(false)
        })
        .catch( (err) => {
            console.log(err)
        })
    }

    return (
        <Modal open={openWindow} dimmer='blurring'>
            <ModalHeader>Create a new product</ModalHeader>
            <ModalContent>
                <Form>
                    <FormField required>
                        <label>Name</label>
                        <input 
                            placeholder='Please enter product name'
                            onBlur={(e) => handleChangeProduct('name', e.target.value)}
                        />
                    </FormField>
                    <FormField required>
                        <label>Price</label>
                        <input
                            placeholder='Please enter product price'
                            onBlur={(e) => handleChangeProduct('price', e.target.value)}
                        />
                    </FormField>
                </Form>
            </ModalContent>
            
            <Modal.Actions>
                <Button color='black' onClick= {() => toggleCreateProductModal(false)}>Cancel</Button>
                <Button 
                content="Create"
                icon='checkmark'
                onClick={createProduct}
                positive
                />
            </Modal.Actions>
        </Modal>
    )


}
export default CreateProduct