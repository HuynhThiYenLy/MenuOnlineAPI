const CartModel = require('../cart/CartModel');

// Lấy tất cả sản phẩm trong giỏ hàng
const getAll = async () => {
    try {
        const carts = await CartModel.find();
        return carts;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Thêm một sản phẩm mới vào giỏ hàng
const add = async (cartData) => {
    try {
        const { products } = cartData;

        const newCart = new CartModel({ products });

        await newCart.save();

        console.log('Tạo giỏ hàng mới thành công', newCart);

        return newCart;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = { getAll, add };