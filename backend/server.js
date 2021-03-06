const app = require('./app')
const connectDatabase = require('./config/database')
// const dotenv = require('dotenv')
const cloudinary = require('cloudinary')

process.on('uncaughtException', err =>
{
    console.log(`ERROR: ${ err.message }`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1)
})

if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })

connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const server = app.listen(process.env.PORT, () =>
{
    console.log(`Server started on port ${ process.env.PORT } in ${ process.env.NODE_ENV } mode`);
})

process.on('unhandledRejection', err =>
{
    console.log(`ERROR: ${ err.message }`);
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(() =>
    {
        process.exit(1)
    })
})