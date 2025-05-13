import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import fs from 'fs';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

const upload = multer({ storage: storage });

const app = express();
const PORT = 4000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', (req, res) => {
  upload.array('photos', 5)(req, res, (err) => {
    if (err) {
      console.error('Błąd multera:', err);
      return res.status(500).json({ message: 'Błąd podczas przetwarzania plików' });
    }

    try {
      const files = req.files;
      console.log('Przesłane pliki:', files);

      if (!files || files.length === 0) {
        return res.status(400).json({ message: 'Nie przesłano żadnych plików' });
      }

      const fileUrls = files.map(file => {
        return `http://localhost:4000/uploads/${file.filename}`;
      });

      console.log('Wygenerowane URL plików:', fileUrls);

      return res.status(200).json({
        message: 'Pliki przesłane pomyślnie',
        fileUrls: fileUrls
      });
    } catch (error) {
      console.error('Błąd podczas przesyłania plików:', error);
      return res.status(500).json({ message: 'Błąd serwera podczas przesyłania plików' });
    }
  });
});

app.post('/verify-recaptcha', async (req, res) => {
    const { recaptchaToken } = req.body;
    const secretKey = '6LcoNAUrAAAAAEuCLxnuwduvLXLxb-5wArMvMrod';

    try {
        const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${secretKey}&response=${recaptchaToken}`
        });

        const data = await response.json();
        if (data.success) {
            return res.status(200).json({ message: 'reCAPTCHA zweryfikowane' });
        } else {
            return res.status(400).json({ message: 'Nieudana weryfikacja reCAPTCHA' });
        }
    } catch (error) {
        console.error('Błąd podczas weryfikacji reCAPTCHA:', error);
        return res.status(500).json({ message: 'Błąd serwera podczas weryfikacji' });
    }
});

app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});