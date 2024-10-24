import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import router from './routers/contacts.js';

const PORT = process.env.PORT || 5000;

function setupServer() {
    const app = express();

    // Налаштування middleware
    app.use(express.json());
    app.use(cors());
    app.use(pinoHttp({ logger: pino() }));

    app.use('/api', router);
    // app.get('/contacts', (req, res) => {
    //     res.json({ contacts: [] });
    // });

    // Обробка неіснуючих маршрутів
    app.use((req, res, next) => {
        res.status(404).json({ message: 'Not found' });
    });

    // Обробка інших помилок
    app.use((err, req, res, next) => {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    });

    // Запуск сервера
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });

    return app;
}

export default setupServer;

