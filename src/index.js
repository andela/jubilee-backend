import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use(routes);
app.get('/', (req, res) => res.status(200).send({ message: 'welcome to BN: jubilee-team' }));
app.all('*', (req, res) => res.send({ message: 'route not found' }));

app.listen(port, () => {
  console.info(`Listening on port ${port}`);
});

export default app;
