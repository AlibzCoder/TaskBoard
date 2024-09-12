import express from "express";
import { Mongoose } from "mongoose";
import { createApp } from "./createApp";
import InitDB from "./db";
import specs from './swagger'
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

InitDB().then((client : Mongoose)=>{
	const app = createApp();
	app.set('db', client)

	const PORT = 3000;
	app.listen(PORT, () => {
		console.log(`Running on Port ${PORT}`);
	});
	app.use('/', express.static(path.join(__dirname, 'public')))
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
})
