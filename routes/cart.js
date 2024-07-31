const express = require('express');
const router = express.Router();
const CartController = require('../modules/cart/CartController');

// Route để lấy tất cả các giỏ hàng
router.get('/getcarts', async (req, res) => {
    try {
        const carts = await CartController.getAll();
        res.json(carts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route để tạo một giỏ hàng mới
router.post('/add', async (req, res) => {
    try {
        const cartData = req.body;
        const newCart = await CartController.add(cartData);

        res.status(201).json({ message: 'Thêm sản phẩm vào giỏ hàng thành công', newCart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;