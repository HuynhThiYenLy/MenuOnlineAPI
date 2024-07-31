const express = require('express');
const router = express.Router();
const QAController = require('../modules/QA/QAController');

// lấy tất cả danh mục
router.get('/getqa', async function (req, res, next) {
    try {
        const qa = await QAController.getAll();
        res.status(200).json(qa);
    } catch (error) {
        next(error);
    }
});

// Route để thêm mới một danh mục
router.post('/add', async function (req, res, next) {
    try {
        const { question, answer } = req.body;

        const newqa = await QAController.insert(question, answer);

        res.status(201).json({ message: 'Thêm thành công', newqa });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
