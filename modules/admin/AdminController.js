const AdminModel = require('./AdminModel');
const bcrypt = require('bcrypt');

const register = async (username, password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const admin = new AdminModel({ username, password: hash });
        await admin.save();

        return admin;
    } catch (error) {
        throw error;
    }
}

const login = async (username, password) => {
    try {
        const admin = await AdminModel.findOne({ username });

        if (admin && bcrypt.compareSync(password, admin.password)) {
            return admin;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

// quên mật khẩu
const updateForgottenPassword = async (username, newPassword) => {
    try {
        const admin = await AdminModel.findOne({ username });
        if (admin) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            admin.password = hashedPassword;

            await admin.save();
        }
        return admin;
    } catch (error) {
        throw error;
    }
}


module.exports = { register, login, updateForgottenPassword };