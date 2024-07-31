const BillModel = require('./BillModel');

// Xem tất cả hóa đơn
const getAll = async () => {
    try {
        const bills = await BillModel.find()
            // .populate('userID').populate('products.productID').exec();

        return bills;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Hàm tạo một hóa đơn mới
const insert = async (billData) => {
    try {
        const { userID, date, thanhToan, products, trangThai } = billData;

        const newBill = new BillModel({ userID, date, thanhToan, products, trangThai });

        await newBill.save();

        console.log('Tạo hóa đơn thành công', newBill);

        return newBill;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = { getAll, insert };
