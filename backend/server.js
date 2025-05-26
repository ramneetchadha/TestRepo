const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectUserDB = require('./config/dbUser');
const connectTaskDB = require('./config/dbTask');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const authController = require('./controllers/authController');


// Load Environment Variables
dotenv.config();



// Connect Databases
connectUserDB();
// let taskDB;
// (async () => {
//   taskDB = await connectTaskDB();
// })();
connectTaskDB();

// Initialize Express App
const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }))


app.use(bodyParser.json());
app.use(express.json());

// Routes
//app.post('/api/auth/register', authController.registerUser);
app.use('/api/auth', (req, res, next) => {
  console.log("helloooooo")
  req.db = connectUserDB; // Pass User Database Connection
  next();
}, authRoutes);

// const Tasks = require('./routes/tasks');
// app.get('/api/tasks', Tasks.getAllTasks);
// app.get('/api/tasks', (req, res) => {
//   console.log("response ...");
//   res.status(200).send("hehehehheee");
// });
app.use('/api/tasks', (req, res, next) => {
  console.log("Calling.....123")
  req.db = connectTaskDB; // Pass Task Database Connection

  next();
}, taskRoutes.router);

// Root Route
// app.get('/', (req, res) => {
//   res.send('Employee Task Management System API');
// });


// const dotenv = require('dotenv');
// dotenv.config();
console.log(process.env.MONGO_URI_TASK)

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
