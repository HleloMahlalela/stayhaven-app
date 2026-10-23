const express = require('express');
const listingRoutes = require('./routes/listingRoutes');

const app = express();

app.use(express.json());
app.use('/api/listings', listingRoutes);

if (require.main === module) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`StayHaven server listening on port ${port}`);
  });
}

module.exports = app;
