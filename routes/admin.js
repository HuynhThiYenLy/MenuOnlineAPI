var express = require('express');
const router = express.Router();
var AdminController = require('../modules/admin/AdminController');

router.get("/login", function (req, res) {
    res.render("login");
});

// dangky
router.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await AdminController.register(username, password);
        res.status(201).json({ message: 'Đăng ký thành công', admin });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

router.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await AdminController.login(username, password);

        if (admin) {
            res.status(200).json({ message: 'Đăng nhập thành công', admin });
        } else {
            res.status(401).json({ error: 'Email hoặc mật khẩu không đúng.' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
});

// quên mật khẩu
router.post('/quenmatkhau', async function (req, res, next) {
    try {
        const { username, newPassword } = req.body;

        const admin = await AdminController.updateForgottenPassword(username, newPassword);

        if (admin) {
            res.status(200).json({ message: 'Mật khẩu đã được cập nhật thành công.' });
        } else {
            res.status(404).json({ error: 'Tên người dùng không tồn tại trong hệ thống.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;