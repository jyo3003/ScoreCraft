#!/bin/bash

# Change directory to your Spring Boot backend
cd scorecraft_backend/src/main/java/com/SER517/scorecraft_backend

# Start Spring Boot backend
mvn clean package spring-boot:run

# Wait for a few seconds 
sleep 15


cd /Users/mohanakarumanchi/Desktop/SER517_Team16/scorecraft

# Install dependencies and start frontend
npm install
npm start
