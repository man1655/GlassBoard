import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GlassBoard API Documentation',
      version: '1.0.0',
      description: 'API documentation for the MERN Dashboard Application',
      contact: {
        name: 'Backend Developer',
        email: 'dev@glassboard.com', // Replace with your email
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api', // Change this to your Render URL when deployed
        description: 'Local Development Server',
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
  // Look for documentation in these files
  apis: ['./routes/*.js', './models/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;