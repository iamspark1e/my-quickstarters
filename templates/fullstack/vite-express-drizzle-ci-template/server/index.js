import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import Sentry from "@sentry/node"
import * as dotenv from 'dotenv';

const isProd = process.env.NODE_ENV === 'production';
dotenv.config({ path: isProd ? '.env' : '.env.development' })

const logger = morgan("tiny");
const app = express();

if(isProd && process.env.SENTRY_DSN) {
    Sentry.init({ dsn: process.env.SENTRY_DSN });
    app.use(Sentry.Handlers.requestHandler());
}

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(logger);

// Healthy check
app.get("/api/__internal/__health", async (req, res) => {
    res.json({ ok: 1 })
})

if(process.env.SENTRY_DSN) {
    app.use(Sentry.Handlers.errorHandler());
}

// Bootstrap
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("[App] Express app is running on: ", port);
});