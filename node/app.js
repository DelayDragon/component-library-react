const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'uploads/' });

const cors = require('cors')
app.use(cors())

app.post('/upload', upload.any(), (req, res) => {
    console.log(req);
    // 处理接收到的文件
    const file = req.file;
    // 对接收到的文件进行处理，可以进行保存、验证、修改等操作
    // 返回适当的响应
    res.json({ message: '文件上传成功' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});