const express = require('express');
const router = express.Router();
const CategoryController = require('../modules/category/CategoryController');

// lấy tất cả danh mục
router.get('/getcategories', async function (req, res, next) {
    try {
        const categories = await CategoryController.getAll();
        res.status(200).json(categories); // Trả về dữ liệu dưới dạng JSON
    } catch (error) {
        next(error);
    }
});

// lấy danh mục cha
router.get('/getparent', async function (req, res, next) {
    try {
        const parentCategories = await CategoryController.getParent();
        res.status(200).json(parentCategories);
    } catch (error) {
        next(error);
    }
});

// Route để lấy danh mục con của một danh mục cha
router.get('/getparent/:parentID', async function (req, res, next) {
    try {
        const parentID = req.params.parentID;
        const subCategories = await CategoryController.getSub(parentID);
        res.status(200).json(subCategories);
    } catch (error) {
        next(error);
    }
});

// Route để thêm mới một danh mục
router.post('/add', async function (req, res, next) {
    try {
        const { name, parentID } = req.body;
        if (parentID == "") {
             newCategory = await CategoryController.insert(name, null);
        } else {
             newCategory = await CategoryController.insert(name, parentID);
            
        }
        res.status(201).json({ message: 'Thêm thành công', newCategory });
    } catch (error) {
        next(error);
    }
});

// Route để xóa một danh mục
router.delete('/remove/:catId', async function (req, res, next) {
    try {
        const catId = req.params.catId;
        await CategoryController.remove(catId);
        res.status(200).json({ message: "Xóa danh mục thành công" });
    } catch (error) {
        next(error);
    }
});

// Route để cập nhật thông tin của một danh mục
router.put('/update/:catId', async function (req, res, next) {
    try {
        const catId = req.params.catId;
        const { name, parentID } = req.body;
        const updatedCategory = await CategoryController.update(catId, name, parentID);
        if (updatedCategory) {
            res.status(200).json(updatedCategory);
        } else {
            res.status(404).json({ message: 'Không tìm thấy danh mục cần cập nhật.' });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
