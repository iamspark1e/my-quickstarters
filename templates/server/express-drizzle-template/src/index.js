// const express = require("express");
// const cors = require("cors");
// const cookieParser = require('cookie-parser');
// const morgan = require("morgan");
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

// Expand .env for Prisma db connection
// const dotenv = require('dotenv')
// const dotenvExpand = require('dotenv-expand')
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
const myEnv = dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env' : '.env.development' })
dotenvExpand.expand(myEnv)

const logger = morgan("tiny");

const app = express();
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(logger);

// Healthy check
app.get("/internal/_health", async (req, res) => {
  res.json({ ok: 1 })
})

// Bootstrap
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("[App] Express app is running on: ", port);
});