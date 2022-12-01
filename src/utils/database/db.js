const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;

if (!DB_URL) throw new Error('url not found :(');

const connectDb = async () => {
  try {
    const db = await mongoose.connect(DB_URL);
    const { name, host } = db.connection;
    console.log(`successfully connected to: ${name} in ${host}`);

  } catch (error) {
    console.log('Error connecting to database');
  }

}

module.exports = {
  connectDb,
  DB_URL,
}