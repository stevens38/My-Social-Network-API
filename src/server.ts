import express from 'express';
import router from './routes/index.js';
import db from './config/connections.js';


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(router);

db.once('open', () => {
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
});