const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');

const app = express();

// Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: 'Farm-Ease : Rental Service API',
      description: 'Farm-Ease Rental Service API facilitates agricultural equipment rental, linking farmers and equipment owners. It offers user authentication, equipment listing, booking management, and reviews, streamlining the rental process.',
      version: '1.0.0',
    },
    servers:  [{
      url: "http://localhost:3000/"
    }]
  },
  // API specifications files 
  apis: ['./routes/*.js'], // Path to the API routes files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
