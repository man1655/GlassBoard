import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GlassBoard API Documentation',
      version: '1.0.0',
      description: 'API documentation for GlassBoard Dashboard, Logs, and Notifications',
      contact: {
        name: 'Support',
      },
    },
    servers: [
      {
        url: 'https://glassboard-api.onrender.com', 
        description: 'Devlopment Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
 apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);


export default swaggerSpec;