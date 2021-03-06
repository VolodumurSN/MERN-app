const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places');
const usersRoutes = require('./routes/users');
const HttpError = require('./models/http-error');

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use(
  '/uploads/images',
  express.static(path.join('uploads', 'images')),
);

app.use('/api/places', placesRoutes);

app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  throw new HttpError('Could not find this route!', 404);
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }

  if (res.headersSent) {
    return next(error);
  }

  console.log(error);
  res.status(error.code || 500);
  res.json(error.message || 'An unknown error occurred!');
});

mongoose
  .connect(
    'mongodb+srv://v_snaichuk:yoWeiiGFl3fRsA45@cluster0.xfxuz.mongodb.net/mern?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
  )
  .then(() => {
    app.listen(port, () =>
      console.log(`App listening on port ${port}!`),
    );
  })
  .catch((e) => {
    console.log(e);
  });
