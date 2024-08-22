const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const Product = require('../model/Product');

// Route to get recommendations based on a search query
router.get('/', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'No search query provided' });
    }

    // Find the product based on the search query (assuming the query matches the product name)
    const product = await Product.findOne({ name: { $regex: query, $options: 'i' } });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find all products to use in the recommendation engine
    const allProducts = await Product.find({});

    // Spawn a Python process to run the similarity algorithm
    const pythonProcess = spawn('python', ['recommendations.py']);

    // Prepare the data to be sent to the Python script
    const inputData = {
      products: allProducts,
      query_product: product,
    };

    // Send data to the Python script
    pythonProcess.stdin.write(JSON.stringify(inputData));
    pythonProcess.stdin.end();

    // Handle data from Python script
    pythonProcess.stdout.on('data', (data) => {
      try {
        const recommendations = JSON.parse(data.toString());
        res.status(200).json(recommendations);
      } catch (error) {
        console.error('Error parsing Python script output:', error);
        res.status(500).json({ message: 'Error processing recommendations', error: error.toString() });
      }
    });

    // Handle errors from Python script
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python error: ${data}`);
      res.status(500).json({ message: 'Error running similarity algorithm', error: data.toString() });
    });

  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ message: 'Error fetching recommendations', error: error.toString() });
  }
});

module.exports = router;
