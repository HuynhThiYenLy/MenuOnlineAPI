const ProductModel = require('../product/ProductModel');

///////// Xem tất cả sản phẩm
const getAll = async () => {
    try {
        const products = await ProductModel.find();
        return products;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Xem chi tiết một sản phẩm dựa vào productId
const viewProduct = async (productId) => {
    try {
        const product = await ProductModel.findById(productId);

        if (!product) {
            return { message: "Không tìm thấy sản phẩm" };
        }
        return product;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


/////////// Thêm một sản phẩm mới
const add = async (name, gia, img, kichCo, xuatXu, tinhTrang, categoryID) => {
    try {
        const newProduct = new ProductModel({ name, gia, img, kichCo, xuatXu, tinhTrang, categoryID });
        await newProduct.save();

        return newProduct;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Lấy sản phẩm dựa trên ID của danh mục (parentID)
const getProductByCategoryID = async (categoryID) => {
    try {
        const products = await ProductModel.findOne({ categoryID });
        if (products) {
            return products;
        }
        return null;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Tìm kiếm sản phẩm dựa trên tên
const searchByName = async (name) => {
    try {
        const regex = new RegExp(name, 'i');
        const searchResults = await ProductModel.find({ name: { $regex: regex } });
        return searchResults;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/////////// Xóa một sản phẩm dựa vào productId
const remove = async (productId) => {
    try {
        await ProductModel.findByIdAndDelete(productId);
        return { message: "Xóa sản phẩm thành công" };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//////////// Sửa thông tin của một sản phẩm
const update = async (productId, name, gia, img, kichCo, xuatXu, tinhTrang, categoryId) => {
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, { name, gia, img, kichCo, xuatXu, tinhTrang, categoryId }, { new: true });

        if (!updatedProduct) {
            return { message: "Sửa sản phẩm thành công" };
        }

        return updatedProduct;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { getAll, getProductByCategoryID, searchByName, viewProduct, add, remove, update };