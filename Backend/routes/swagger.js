const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: 'Repriced', // Title (required)
      version: '1.0.0', // Version (required)
    },
    tags:
      [
        {
          name: 'user',
          description: 'User Operations',
        },
        {
          name: 'giveaway',
          description: 'Giveaway Operations',
        },
        {
          name: 'auth',
          description: 'Handling Login and Logout',
        },
      ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            firstName: {
              type: 'string',
            },
            lastName: {
              type: 'string',
            },
            username: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
            gender: {
              type: 'string',
            },
            dateOfBirth: {
              type: 'string',
            },
            phoneNumber: {
              type: 'string',
            },
            country: {
              type: 'string',
            },
            city: {
              type: 'string',
            },
            role: {
              type: 'string',
            },
          },
        },
        Giveaway: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            expirationDate: {
              type: 'string',
            },
            status: {
              type: 'string',
            },
            participantsLimit: {
              type: 'string',
            },
            costByParticipant: {
              type: 'decimal',
            },
          },
        },
      },
    },
  },

  // Path to the API docs
  apis: ['./routes/auth.js', './routes/giveaway.js', './routes/user.js'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
