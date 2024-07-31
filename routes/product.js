const express = require('express');
const router = express.Router();
const ProductController = require('../modules/product/ProductController');

/////////// Xem tất cả sản phẩm
router.get('/getproducts', async function (req, res, next) {
    try {
        const products = await ProductController.getAll();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});

// Lấy sản phẩm dựa trên ID của danh mục
router.get('/getproducts/:categoryID', async function (req, res, next) {
    try {
        const { categoryID } = req.params;
        const products = await ProductController.getProductByCategoryID(categoryID); // Thay đổi tên hàm gọi
        
        if (products) {
            res.status(200).json({ message: 'Tìm thành công', user });
        } else {
            res.status(401).json({ error: 'Không tìm dc sp.' });
        }
    } catch (error) {
        next(error);
    }
});


// Tìm kiếm sản phẩm dựa trên tên
router.post('/search/:name', async function (req, res, next) {
    try {
        const { name } = req.params;
        const searchResults = await ProductController.searchByName(name);
        if (searchResults.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy kết quả phù hợp' });
        }
        res.status(200).json(searchResults);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


// Xem chi tiết sản phẩm dựa trên productId
router.get('/view/:productId', async function (req, res, next) {
    try {
        const productId = req.params.productId;
        const product = await ProductController.viewProduct(productId);
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
});

/////////// Thêm một sản phẩm mới
router.post('/add', async function (req, res, next) {
    try {
        const { name, gia, img, kichCo, xuatXu, tinhTrang, categoryID } = req.body;
        const newProduct = await ProductController.add(name, gia, img, kichCo, xuatXu, tinhTrang, categoryID);
        res.status(201).json({ message: 'Thêm sản phẩm thành công', newProduct });
    } catch (error) {
        next(error);
    }
});

/////////// Cập nhật thông tin của một sản phẩm dựa trên productId
router.put('/update/:productID', async function (req, res, next) {
    try {
        const productId = req.params.productID;
        const { name, gia, img, kichCo, xuatXu, tinhTrang, categoryId } = req.body;
        const updatedProduct = await ProductController.update(productId, name, gia, img, kichCo, xuatXu, tinhTrang, categoryId);
        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
});

/////////// Xóa một sản phẩm dựa trên productId
router.delete('/delete/:productID', async function (req, res, next) {
    try {
        const productID = req.params.productID;
        await ProductController.remove(productID);
        res.status(200).json({ message: "Xóa sản phẩm thành công" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
