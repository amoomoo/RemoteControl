const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();
console.log(`Hello ${process.env}`);

const MONGO_URI = `mongodb+srv://${process.env.MDBLOGIN}:${process.env.MDBPWD}@vibe.z9vaxc5.mongodb.net/`;


//contains a User collection

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'scratch',
  })
  .then(() => console.log('Connected to Scratch DB!'))
  .catch((err) => console.log(err));

const locationSchema = new Schema({
  locationID: { type: String },
  score: { type: Number },
  tags: [{ type: String }],
});

const userSchema = new Schema({
  // added unique:true for email
  email: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  beenList: { type: Array, required: true },
  savedList: { type: Array, required: true },
  loveList: { type: Array, required: true },
  friendList: [{ type: String }],
});

module.exports = mongoose.model('User', userSchema);
module.export = mongoose.model('Location', locationSchema);