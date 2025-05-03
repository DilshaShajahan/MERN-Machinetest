AI-Enhanced MERN Real-Time Dashboard & Flowchart
Overview
This project is a MERN-stack application that demonstrates real-time data visualization, interactive flowchart editing, and user authentication using OTP. It incorporates the following features:

Signup/Login with OTP: Secure user authentication.

Real-Time Data: Live-updating charts representing data from a simulated sensor.

Interactive Flowchart Editor: Create, update, and persist flowcharts in MongoDB.

Tech Stack
Backend: Node.js, Express, MongoDB, JWT

Frontend: React, React-Router, Redux/Context API, React-Flow, Chart.js

Authentication: JWT, nodemailer

Styling: CSS3

Real-Time: Socket.IO (or SSE for real-time data)

AI Tools: ChatGPT, GitHub Copilot

Setup & Installation
Prerequisites:
Node.js and npm (or yarn)

MongoDB (or a cloud-based DB like MongoDB Atlas)

An OTP service (Twilio or nodemailer)

Steps:
Clone the repository:

bash
Copy
Edit
git clone <repo-url>
cd <repo-directory>
Setup Backend:

Navigate to the /server directory:

bash
Copy
Edit
cd server
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file with the following environment variables:

MONGO_URI (MongoDB connection URI)

JWT_SECRET (A secret string for JWT)

OTP_SERVICE_API_KEY (Twilio or nodemailer credentials)

Start the backend:

bash
Copy
Edit
npm run start
Setup Frontend:

Navigate to the /client directory:

bash
Copy
Edit
cd client
Install dependencies:

bash
Copy
Edit
npm install
Start the frontend:

bash
Copy
Edit
npm run start
Start the data simulator (Backend):

In the /server folder, run the simulator to emit real-time data:

bash
Copy
Edit
npm run data-simulator
API Endpoints
Auth API:
POST /api/auth/signup: Send OTP to email

POST /api/auth/verify-otp: Verify OTP and create user

POST /api/auth/login: Login with email and password

GET /api/auth/profile: Get user profile

Data API:
GET /api/data/start: Start data simulation

GET /api/data/stop: Stop data simulation

GET /api/data/history: Fetch historical data

Flow API:
POST /api/flow/save: Save flowchart

GET /api/flow/load: Load saved flowchart

PUT /api/flow/update: Update flowchart

Demo
OTP Signup & Login: The user can sign up, verify OTP, and log in.

Real-Time Chart Updates: The dashboard displays live charts updated every 1-2 seconds.

Flowchart Editor: Users can create and edit flowcharts, which are saved in MongoDB.

How to Run the Project
Follow the Setup & Installation instructions.

Once the server and client are both running, open your browser at http://localhost:3000 to access the application.

AI Tools Used
GitHub Copilot: Assisted in generating routes, Mongoose models, and utility functions.

ChatGPT: Helped scaffold frontend components, optimize JWT handling, and troubleshoot issues.

License
This project is licensed under the MIT License.
