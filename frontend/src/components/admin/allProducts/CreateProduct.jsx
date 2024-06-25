import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, IconButton, Autocomplete, Alert } from '@mui/material';
import { AddPhotoAlternate, Delete } from '@mui/icons-material';
import './CreateProduct.css';

const categoryOptions = [
  'men-t-shirt',
  'men-shirt',
  'men-pants',
  'women-dress',
  'women-top',
];

const CreateProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState('success');

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);

    const filePreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...filePreviews]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('description', description);
    formData.append('category', category);

    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const { data } = await axios.post('/api/v1/product/new', formData);
      setAlertMessage('Product created successfully!');
      setAlertSeverity('success');
      console.log(data);
    } catch (error) {
      setAlertMessage('Error creating product: ' + error.message);
      setAlertSeverity('error');
      console.error('Error creating product:', error);
    }
  };

  return (
    <Box className='dashboard-container' component="form" encType="multipart/form-data" onSubmit={handleSubmit}>
      <Typography variant="h4" component="h1" gutterBottom>Product</Typography>

      {alertMessage && (
        <Alert severity={alertSeverity} onClose={() => setAlertMessage(null)} sx={{ mb: 2 }}>
          {alertMessage}
        </Alert>
      )}

      <TextField
        required
        className="custom-input"
        label="Product Name"
        fullWidth
        margin="normal"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />

      <Autocomplete
        required
        className="custom-input"
        options={categoryOptions}
        getOptionLabel={(option) => option}
        fullWidth
        margin="normal"
        value={category}
        onChange={(e, newValue) => setCategory(newValue)}
        renderInput={(params) => <TextField {...params} label="Category" />}
        renderOption={(props, option) => (
          <li {...props} key={option} className="custom-autocomplete-option">
            {option}
          </li>
        )}
      />

      <TextField
        required
        className="custom-input"
        label="Price"
        fullWidth
        margin="normal"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <TextField
        required
        className="custom-input"
        label="Stock"
        fullWidth
        margin="normal"
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      <TextField
        required
        className="custom-input"
        label="Description"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button
        className='file-choose-btn'
        variant="contained"
        component="label"
        startIcon={<AddPhotoAlternate />}
        sx={{ mt: 2, mb: 2, px: 5, backgroundColor: 'transparent', color: 'gray', width: '100%' }}
      >
        Upload Images
        <input
          type="file"
          hidden
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
      </Button>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
        {imagePreviews.map((src, index) => (
          <Box key={index} sx={{ position: 'relative', display: 'inline-block' }}>
            <Box
              component="img"
              src={src}
              alt={`Preview ${index}`}
              sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '4px' }}
            />
            <IconButton
              size="small"
              onClick={() => handleRemoveImage(index)}
              sx={{ position: 'absolute', top: 4, right: 4, background: 'rgba(255, 255, 255, 0.7)' }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>

      <Button className='create-product-btn' type="submit" variant="contained" color="primary">
        Create Product
      </Button>
    </Box>
  );
};

export default CreateProduct;
