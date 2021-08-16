import React, { useState, useEffect } from 'react'
import { Table, Button, Icon, Dropdown, TableRow, TableHeaderCell, TableBody, TableCell, Pagination } from 'semantic-ui-react'

import '../../custom.css'
import EditProduct from './EditProduct';

const ProductTable = (props) => {
  const { products, fetchProducts } = props;
  const [editProductModal, setEditProductModal] = useState(false)
  const [deleteProductModal, setDeleteProductModal] = useState(false)
  const [prodId, setProdId] = useState(0)
  const [product, setProduct] = useState({Id:"",Name:"",Price:""})
  const [displayProducts, setDisplayProducts] = useState(null)

  const [sortNameOrder, setSortNameOrder] = useState(null)
  const [sortPriceOrder, setSortPriceOrder] = useState(null)
  const [totalItems, setTotalItems] = useState(0);
  const [noOfItemsPerPage, setNoOfItemsPerPage] = useState(5)
  const [noOfPages, setNoOfPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)


  let noOfItemsOptions = [
    { text: '5 items', value: 5 },
    { text: '10 items', value: 10 },
    { text: '15 items', value: 15 }
  ]


  const toggleDeleteProductModal = (value, id) => {
    setProdId(id)
    setDeleteProductModal(value)
  }

  const toggleEditProductModal = (value, product) => {
    setProduct(product)
    setEditProductModal(value)
  }

  const changeSortingOrder = (column) => {
    var sortOrder = null
    if (column === "name") {
      sortOrder = sortNameOrder === 'ascending' ? 'descending' : 'ascending'
      setSortNameOrder(sortOrder)
      setSortPriceOrder(null)
      products.sort((a, b) => (a.name > b.name) ? 1 : -1)
    }
    else if (column === "price") {
      sortOrder = sortPriceOrder === 'ascending' ? 'descending' : 'ascending'
      setSortPriceOrder(sortOrder)
      setSortNameOrder(null)
      products.sort((a, b) => (a.price > b.price) ? 1 : -1)
    }
    if ((sortOrder === "descending")) {
      products.reverse()
    }
  }

  const UpdateTableContents = () => {
    var Arr = products.slice((currentPage - 1) * noOfItemsPerPage, currentPage * noOfItemsPerPage)
    setDisplayProducts(Arr)
  }

  const handleChange = (e, data) => {
    e.preventDefault()
    setNoOfItemsPerPage(data.value)
    setCurrentPage(1)
    UpdateTableContents()
  }

  const handlePaginationChange = (e, data) => {
    e.preventDefault()
    setCurrentPage(data.activePage)
    UpdateTableContents()
  }

  useEffect(() => {
    setTotalItems(products.length)
    setNoOfPages(Math.ceil(totalItems / noOfItemsPerPage))
    UpdateTableContents()
  }, [products, totalItems, noOfItemsPerPage])

    useEffect(() => {
    setCurrentPage(currentPage)
    setNoOfItemsPerPage(noOfItemsPerPage)
    UpdateTableContents()
  }, [currentPage, noOfItemsPerPage]) 

  return (
    <div>
      <Table sortable className="style-table" celled size='small'>
        <Table.Header>
          <TableRow>
            <TableHeaderCell sorted={sortNameOrder} onClick={() => changeSortingOrder("name")}>Name</TableHeaderCell>
            <TableHeaderCell sorted={sortPriceOrder} onClick={() => changeSortingOrder("price")}>Price</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableRow>
        </Table.Header>
        <TableBody>
          {displayProducts && displayProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>
                <Button onClick={() => toggleEditProductModal(true, product)} icon labelPosition='left' color='yellow' size='tiny' >
                  EDIT
                  <Icon name='edit' size='small' />
                </Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => toggleDeleteProductModal(true, product.id)} icon labelPosition='left' color='red' size='tiny' >
                  DELETE
                  <Icon name='trash' size='small' />
                </Button>
              </TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
      <div className="row" width="100%">
        <div className="column">
          <Dropdown
            selection
            options={noOfItemsOptions}
            defaultValue={noOfItemsOptions[0].value}
            onChange={handleChange}
          />
        </div>
        <div className="column align-right" >
          <Pagination
            size="small"
            activePage={currentPage}
            totalPages={noOfPages}
            onPageChange={handlePaginationChange}
          />
        </div>
      </div>

      <EditProduct
        openEditProdModal={editProductModal}
        toggleEditProductModal={toggleEditProductModal}
        product={product}
        fetchProducts={fetchProducts}
      />

      <EditProduct
        openWindow={deleteProductModal}
        toggleDeleteProductModal={toggleDeleteProductModal}
        id={prodId}
        fetchProducts={fetchProducts}
      />
    </div>
  );
}
export default ProductTable