require('dotenv').config();
const express = require('express');
const connectDB = require('./config/DB');
const cors = require('cors');
const app = express();

// Connect Database
connectDB();

app.use(cors());
app.use(express.json());

// Routes
const auth = require('./routes/authRoutes')
app.use('/api/auth', auth)


app.get('/', (req, res) => res.send('API Running GET'));
app.post('/',(req, res) => res.send('API Running POST'))


const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
