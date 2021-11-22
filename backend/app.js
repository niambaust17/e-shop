const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
// const dotenv = require('dotenv');
const path = require('path');

const errorMiddleware = require('./middlewares/errors');

if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(fileUpload());

const products = require('./routes/product');
const auth = require('./routes/auth');
const payment = require('./routes/payment');
const orders = require('./routes/order');

app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', payment);
app.use('/api/v1', orders);

if (process.env.NODE_ENV === 'PRODUCTION')
{
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) =>
    {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
    })
}

app.use(errorMiddleware);

module.exports = app