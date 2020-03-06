const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const cors = require('cors');
const multer = require('multer')

const port = process.env.PORT || 1337;
const app = express();

app.use(cors());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/server/temp')
    },
    filename: function (req, file, cb) {
        cb(null, "file")
    }
})

const upload = multer({ storage: storage }).single('file')

app.post('/file', function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(getHashes())
    })
})

const getHashes = () => {
    const filePath = __dirname + '/temp/file'; // get the path for the file
    const binary = fs.readFileSync(filePath, null);
    const md5Hash = crypto.createHash('md5').update(binary).digest("hex");
    const sha256Hash = crypto.createHash('sha256').update(binary).digest("hex");
    const sha1Hash = crypto.createHash('sha1').update(binary).digest("hex");
    fs.unlinkSync(filePath); // delete the file
    return [
        {
            cypher: 'md5',
            hashed: md5Hash
        },
        {
            cypher: 'sha256',
            hashed: sha256Hash
        },
        {
            cypher: 'sha1',
            hashed: sha1Hash
        }
    ]
};

app.listen(port, () => console.log(`Server started on port ${port}`));