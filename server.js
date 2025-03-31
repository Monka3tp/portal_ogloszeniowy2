import express from 'express';
import fetch from 'node-fetch';
import multer from 'multer';
import path from 'path';

const app = express();
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

app.post('/verify-recaptcha', async (req, res) => {
    const { recaptchaToken } = req.body;
    const secretKey = '6LcoNAUrAAAAAEuCLxnuwduvLXLxb-5wArMvMrod';

    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${secretKey}&response=${recaptchaToken}`
    });

    const data = await response.json();
    if (data.success) {
        res.status(200).send({ message: 'reCAPTCHA zweryfikowane' });
    } else {
        res.status(400).send({ message: 'Nieudana weryfikacja reCAPTCHA' });
    }
});

app.listen(3000, () => {
    console.log('Serwer działa na porcie 5173');
});