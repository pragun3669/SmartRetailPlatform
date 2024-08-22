const express = require('express');
const router = express.Router();
const passport = require('passport');
const Cart = require('../model/Cart');
const Product = require('../model/Product');

// Middleware to ensure user is authenticated
const ensureAuthenticated = passport.authenticate('local', { session: true });

// Add item to cart
router.post('/add', ensureAuthenticated, async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;

        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        // Verify product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += 1;
        } else {
            cart.items.push({ productId, quantity: 1 });
        }

        await cart.save();
        res.json({ message: 'Item added to cart successfully' });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Remove item from cart
router.post('/remove', ensureAuthenticated, async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    if (!productId) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
        const cart = await Cart.findOne({ userId });

        if (cart) {
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex > -1) {
                cart.items.splice(itemIndex, 1);
                await cart.save();
                res.json({ message: 'Item removed from cart' });
            } else {
                res.status(404).json({ message: 'Item not found in cart' });
            }
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
