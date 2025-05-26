const mongoose = require('mongoose');

const connectUserDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/user_management_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to User Database...');
  } catch (err) {
    console.error('Error connecting to User Database:', err.message);
    process.exit(1);
  }
};

module.exports = connectUserDB;
console.log(process.env)