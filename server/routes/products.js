const express = require('express');
const Product = require('../model/Product');

const router = express.Router();

// Create a new product
router.post('/', async (req, res) => {
  const { name, description, qrCode, price, images, category, tags } = req.body;
 
  try {
    const newProduct = new Product({
      name,
      description,
      qrCode,
      price,
      images,
      category,
      tags,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Bulk create products
router.post('/bulk', async (req, res) => {
  const products = req.body; // Expecting an array of product objects

  console.log('Bulk Request Body:', products);

  try {
    // Validate the data if needed
    if (!Array.isArray(products)) {
      return res.status(400).json({ message: 'Invalid data format. Expected an array of products.' });
    }

    const savedProducts = await Product.insertMany(products);
    res.status(201).json(savedProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  const { name, description, qrCode, price, images, category, tags } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, qrCode, price, images, category, tags },
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;




