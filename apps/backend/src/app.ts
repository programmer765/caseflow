import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample route
app.get('/api/health', (req, res) => {
  res.status(200).send({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});