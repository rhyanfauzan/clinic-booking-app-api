// app.js - Application Entry Point
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');
const appointmentRoutes = require('./src/routes/appointmentRoutes');
const availabilityRoutes = require('./src/routes/availabilityRoutes');
const reviews = require('./src/routes/ratingRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/availability', availabilityRoutes);
app.use('/reviews', reviews);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
