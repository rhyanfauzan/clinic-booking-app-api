// app.js - Application Entry Point
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');
const doctorRoutes = require('./src/routes/doctorRoutes');
const appointmentRoutes = require('./src/routes/appointmentRoutes');
const availabilityRoutes = require('./src/routes/availabilityRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/availability', availabilityRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
