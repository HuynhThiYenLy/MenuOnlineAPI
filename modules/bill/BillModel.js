const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BillSchema = new Schema({
    userID: { type: ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now }, 
    thanhToan: String,
    products: [
        {
            productID: { type: ObjectId, ref: 'Product' },
            soLuong: Number
        }
    ],
    trangThai: String
});

module.exports = mongoose.model('Bill', BillSchema);
