import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "엘리스 일정 관리 플랫폼",
      description: "일정 관리 플랫폼을 위한 API입니다.",
    },
    security: [{ cookieAuth: [] }],
    servers: [
      {
        url: "/",
      },
    ],
  },
  apis: ["./src/swagger/*.swagger.ts"],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
