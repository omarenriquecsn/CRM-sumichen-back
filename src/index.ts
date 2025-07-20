import app from './server';
import { AppDataSource } from './config/dataBaseConfig';

AppDataSource.initialize().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});
