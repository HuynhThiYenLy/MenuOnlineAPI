const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// Định nghĩa schema cho User
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    diaChi: { type: String, default: null } // Trường địa chỉ mặc định là null
});

// Tạo model từ schema và export nó
module.exports = mongoose.model('User', UserSchema);