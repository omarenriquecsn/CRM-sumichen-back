import express from 'express';
import router from './routes/indexRoutes';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.use(errorHandler);
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://crm-sumichen.vercel.app/', 'https://crm-sumichen-back.vercel.app/'],
    credentials: true,
  }),
);
app.use(morgan('dev'));
app.use(router);

// Configure Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
