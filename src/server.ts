import express from 'express';
import router from './routes/indexRoutes';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const allowedOrigins = [
  'http://localhost:5173',
  'https://crm-sumichen.vercel.app',
  'https://crm-sumichen-back.vercel.app'
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  })
);
app.use(express.json());
app.use(morgan('dev'));
app.use(router);
// Configure Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler);

export default app;
