#!/bin/bash

# Change directory to your Spring Boot backend
cd scorecraft_backend

# Start Spring Boot backend
mvn clean package spring-boot:run &

# Wait for a few seconds 
sleep 15


cd ..
cd scorecraft

# Install dependencies and start frontend
npm install
npm start
