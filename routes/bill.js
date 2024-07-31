const express = require('express');
const router = express.Router();
const BillController = require('../modules/bill/BillController');

// Route để lấy tất cả các hóa đơn
router.get('/getbills', async (req, res) => {
    try {
        const bills = await BillController.getAll();
        res.json(bills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route để tạo một hóa đơn mới
router.post('/add', async (req, res) => {
    try {
        const billData = req.body;
        const newBill = await BillController.insert(billData);

        res.status(201).json({ message: 'Thêm thành công', newBill });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
