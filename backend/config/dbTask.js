const mongoose = require('mongoose');

const connectTaskDB = async () => {
  // try {
  //   const taskDB = await mongoose.createConnection('mongodb://localhost:27017/task_management_db', {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   });
  //   console.log('Connected to Task Database...');
  //   return taskDB;
  // } catch (err) {
  //   console.error('Error connecting to Task Database:', err.message);
  //   process.exit(1);
  // }
  try {
    const dbURI = `mongodb://localhost:27017/task_management_db`;
    const conn = await mongoose.createConnection(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log(`Connected to database: task_management_db`);
    return conn;
} catch (error) {
    console.error(`Error connecting to task_management_db:`, error.message);
    throw error;
}
};

module.exports = connectTaskDB;
