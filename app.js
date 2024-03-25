// app.js - Application Entry Point
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');
const appointmentRoutes = require('./src/routes/appointmentRoutes');
const availabilityRoutes = require('./src/routes/availabilityRoutes');
const reviews = require('./src/routes/ratingRoutes');
const contents = require('./src/routes/cmsRoutes');
const banners = require('./src/routes/bannerRoutes');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

app.use('/users', userRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/availability', availabilityRoutes);
app.use('/reviews', reviews);
app.use('/content', contents);
app.use('/banner', banners);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
