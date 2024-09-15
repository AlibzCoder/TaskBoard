import swaggerJsdoc from "swagger-jsdoc";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Todo Backend API Task",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Ali Banai",
        url: "https://github.com/AlibzCoder",
        email: "banaialiprogrammer@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api"
      },
    ],
  },
  apis: [`${__dirname}/**/*.yaml`], // Path to your API routes
};

export default swaggerJsdoc(options);