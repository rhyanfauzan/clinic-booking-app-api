// app.js - Application Entry Point
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
