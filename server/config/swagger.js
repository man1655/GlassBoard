import swaggerJSDoc from "swagger-jsdoc";
import path from 'path'
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notification API",
      version: "1.0.0",
      description: "API documentation for Notifications",
    },

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        Notification: {
          type: "object",
          required: ["title", "message", "type"],
          properties: {
            _id: {
              type: "string",
              example: "64dcbf8f1c9a2e00123abcd",
            },
            title: {
              type: "string",
              example: "System Maintenance",
            },
            message: {
              type: "string",
              example: "System will be down tonight",
            },
            type: {
              type: "string",
              enum: ["info", "warning", "success", "error"],
              example: "warning",
            },
            createdBy: {
              type: "string",
              example: "64db1c8b9b2e1e00123dcba",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        User: {
          type: "object",
          required: ["fullName", "email", "role", "status"],
          properties: {
            _id: {
              type: "string",
              example: "64db1c8b9b2e1e00123dcba",
            },
            fullName: {
              type: "string",
              example: "John Doe",
            },
            email: {
              type: "string",
              example: "john@example.com",
            },
            role: {
              type: "string",
              example: "Member",
            },
            status: {
              type: "string",
              enum: ["active", "inactive", "banned"],
              example: "active",
            },
            avatar: {
              type: "string",
              example: "https://cdn.site.com/avatar.png",
            },
            bio: {
              type: "string",
              example: "Full-stack developer",
            },
            location: {
              type: "string",
              example: "New York",
            },
            phone: {
              type: "string",
              example: "+91XXXXXXXXXX",
            },
            tagline: {
              type: "string",
              example: "Code. Learn. Build.",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        DashboardState: {
          type: "object",
          properties: {
            totalUsers: {
              type: "number",
              example: 120,
            },
            newSignup: {
              type: "number",
              example: 5,
            },
            activeSessions: {
              type: "number",
              example: 42,
            },
          },
        },
        DashboardChartItem: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Mon",
            },
            date: {
              type: "string",
              example: "2025-01-13",
            },
            users: {
              type: "number",
              example: 10,
            },
          },
        },
        AdminUser: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "65ab12c4e91a8b0012abcd34",
            },
            fullName: {
              type: "string",
              example: "John Doe",
            },
            email: {
              type: "string",
              example: "john@example.com",
            },
            role: {
              type: "string",
              example: "Member",
            },
            status: {
              type: "string",
              example: "active",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        UserStats: {
          type: "object",
          properties: {
            totalUsers: {
              type: "number",
              example: 120,
            },
            activeUsers: {
              type: "number",
              example: 90,
            },
            bannedUsers: {
              type: "number",
              example: 10,
            },
          },
        },

        CreateUserRequest: {
          type: "object",
          required: ["fullName", "email", "password"],
          properties: {
            fullName: {
              type: "string",
            },
            email: {
              type: "string",
            },
            password: {
              type: "string",
            },
            role: {
              type: "string",
              example: "Member",
            },
          },
        },

        UpdateUserRequest: {
          type: "object",
          properties: {
            fullName: {
              type: "string",
            },
            status: {
              type: "string",
              enum: ["active", "inactive", "banned"],
            },
            role: {
              type: "string",
            },
          },
        },
        ActivityLog: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "65bc1234fa91a80012abcd90",
            },
            User: {
              type: "string",
              example: "65ab12c4e91a8b0012abcd34",
            },
            userName: {
              type: "string",
              example: "John Doe",
            },
            action: {
              type: "string",
              example: "CREATE",
            },
            module: {
              type: "string",
              example: "User Management",
            },
            description: {
              type: "string",
              example: "Admin created a new user",
            },
            timestamp: {
              type: "string",
              format: "date-time",
            },
          },
        },
      },
    },
  },

apis: [path.join(__dirname, "../routes/**/*.js")]
};

export default swaggerJSDoc(swaggerOptions);
