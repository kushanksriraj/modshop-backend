const mongoose = require('mongoose');

const dbURI = process.env.dbURI;

const connectDB = () => {

  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // suppress 'collection.ensureIndex is deprecated' warning
    useCreateIndex: true
  })
    .then(() => console.log("Successfully connected to 'v2-modshop' DB."))
    .catch(err => console.log(err));
}

module.exports = connectDB;
