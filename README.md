# UberReplica
DATA 236 Uber replica project

 Instructions to run the application:

1) Download the code from backend and frontend folders.
2) make sure mysql is downloaded 
3) run npm install in the terminal once in the correct path on both folders to download all dependencies
4) run npx sequelize-cli init in the backend
5) open mysql cli and run 

DROP DATABASE IF EXISTS uber_replica; 
CREATE DATABASE uber_replica; 
Update .env with database credentials
6) run npx sequelize-cli db:migrate in the backend terminal
7) run npx nodemon app.js in the backend terminal
8) run npm start in the frontend terminal (yes to running on port 3001)
