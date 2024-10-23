import express, { Request, Response } from 'express';
import cors from 'cors'; 
import routes from './routes';

const app = express();
const PORT = 3003;

app.use(cors({
    origin: 'http://localhost:3000',
  }));

app.use(express.json());

app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
