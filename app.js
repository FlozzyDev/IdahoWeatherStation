import express from 'express';
import router from './routes/index.js';
import YAML from 'yamljs';
import swaggerUUi from 'swagger-ui-express';

const app = express();

const swaggerDocument = YAML.load('./swagger.yaml');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUUi.serve, swaggerUUi.setup(swaggerDocument));

app.use(router);
export default app;
