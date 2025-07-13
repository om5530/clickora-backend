import { createServer } from 'http'
import { app } from './app';

const PORT = 3000;

const server = createServer(app);

app.get('/', (_req, res) => {
  res.send('Hello TypeScript + Node.js!');
});

server.listen(PORT, () => {
  console.log(`Started development server on port ${PORT}`);
});
