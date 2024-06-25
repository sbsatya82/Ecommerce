import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import '../../dashboard/Dashboard.css';
import { Link } from 'react-router-dom';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/v1/admin/products'); // Replace with your API endpoint
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteClick = (productId) => {
    setSelectedProductId(productId);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const {data} = await axios.delete(`/api/v1/product/${selectedProductId}`);
      console.log(data);
      if(data.success===true){
        setProducts(products.filter(product => product._id !== selectedProductId));
        setOpenDialog(false);
        setSelectedProductId(null);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedProductId(null);
  };

  return (
    <Box className="dashboard-container">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product._id}</TableCell>
                <TableCell>
                  <img src={product.images[0].url} alt={product.name} width="50" height="50" />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <Link to={`/admin/product/${product._id}`}>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton onClick={() => handleDeleteClick(product._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AllProducts;
