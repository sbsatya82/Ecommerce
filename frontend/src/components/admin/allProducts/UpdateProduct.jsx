import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, IconButton, Autocomplete, Alert } from '@mui/material';
import { AddPhotoAlternate, Delete } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import './CreateProduct.css';

const categoryOptions = [
  'men-t-shirt',
  'men-shirt',
  'men-pants',
  'women-dress',
  'women-top',
];

const UpdateProduct = () => {
  const { id } = useParams();

  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [localImages, setLocalImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImage, setExistingImage] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data } = await axios.get(`/api/v1/product/${id}`);
        setProductName(data.product.name);
        setPrice(data.product.price);
        setStock(data.product.stock);
        setDescription(data.product.description);
        setCategory(data.product.category);
        setExistingImage(data.product.images);
        setImagePreviews(data.product.images.map(img => img.url));
      } catch (error) {
        console.error('Error fetching product details:', error);
        setAlertMessage('Error fetching product details');
        setAlertSeverity('error');
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setLocalImages((prevImages) => [...prevImages, ...files]);

    const filePreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...filePreviews]);
  };

  const handleRemoveImage = (index) => {
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    if (index < existingImageURLs.length) {
      setExistingImageURLs((prevURLs) => prevURLs.filter((_, i) => i !== index));
    } else {
      setLocalImages((prevImages) => prevImages.filter((_, i) => i !== (index - existingImageURLs.length)));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.put(`/api/v1/product/${id}`, {
        name: productName,
        price,
        stock,
        description,
        category,
        images: existingImage
      });
      setAlertMessage('Product updated successfully!');
      setAlertSeverity('success');
      console.log(data);
    } catch (error) {
      setAlertMessage('Error updating product: ' + error.message);
      setAlertSeverity('error');
      console.error('Error updating product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className='dashboard-container' component="form" encType="multipart/form-data" onSubmit={handleSubmit}>
      <Typography variant="h4" component="h1" gutterBottom>Update Product</Typography>

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

      <Button
        className='create-product-btn'
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
      >
        {isLoading ? 'Updating...' : 'Update Product'}
      </Button>
    </Box>
  );
};

export default UpdateProduct;
