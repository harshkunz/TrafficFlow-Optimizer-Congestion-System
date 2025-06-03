// Load environment variables
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const connectToDb = require('./db/db');
const cors = require('cors');

const app = express();
connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Define routes
const gpsRoutes = require('./routes/gpsRoutes');
const congestionRoutes = require('./routes/congestionRoutes');

app.use('/api', gpsRoutes);
app.use('/api', congestionRoutes);



// testing import

// route testing



app.get('/', (req, res) => {
    res.send('Hello World!...');
});

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});