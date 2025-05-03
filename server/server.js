// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error", err));

// Dummy test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Simulated Sensor Data Emission
setInterval(() => {
  const data = {
    value: Math.floor(Math.random() * 100),
    timestamp: new Date().toISOString()
  };
  io.emit('sensorData', data);
}, 2000);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


const protectedRoutes = require("./routes/protectedRoute");
app.use("/api", protectedRoutes);


const flowRoutes = require('./routes/flowRoutes');
app.use('/api/flow', flowRoutes);


