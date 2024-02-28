# SER517_Team16

# ScoreCraft - Grading Tool

## Overview

ScoreCraft is a cutting-edge web application designed to revolutionize the project evaluation process. This tool enhances the grading experience by seamlessly combining a React frontend, a Spring Boot backend, and SQLite for efficient database management. The current methodology of using Excel spreadsheets for project evaluation is replaced, offering graders a streamlined and user-friendly platform.

## Features

- _Efficient Point Allocation:_ ScoreCraft simplifies point allocation for individual and group project components. Graders can effortlessly input points based on predefined rubrics, minimizing errors and enhancing efficiency.

- _Customized Feedback:_ Enjoy the flexibility to provide detailed, customized comments for each student. ScoreCraft empowers instructors to deliver personalized feedback beyond numeric scores, fostering improved communication.

- _Canvas Integration:_ Upon completion, the tool seamlessly integrates with Canvas, providing students with a structured grading rubric. This integration ensures transparent insights into their performance within the Canvas learning management system.

- _Time Efficiency:_ Designed to save instructors time, ScoreCraft minimizes repetitive writing tasks through automated features and a user-friendly interface.

## Technology Stack

- _Frontend:_ React
- _Backend:_ Spring Boot
- _Database:_ SQLite

## Setup Instructions

1. _Clone the Repository:_
   bash
   git clone https://github.com/jyo3003/SER517_Team16.git

   Switch to the Development Branch:

git checkout DevBranch

Note: We have recently created a new branch called DevBranch from the main branch. This will serve as the main working branch for ongoing development.
Project Structure

/docs: Project documentation and guidelines.
/scorecraft Frontend Codebase
/scorecraft_backend Backend Codebase

Main: The main branch is used for stable, production-ready code.
DevBranch: The development branch is the main working branch for ongoing development.

2. _Install Dependencies:_
   bash

   # Frontend (React)

   cd frontend
   npm install

   # Backend (Spring Boot)

   # Using Maven:

Open a terminal or command prompt in the project directory.
Run the following command to build and run the Spring Boot application:
bash
./mvnw spring-boot:run
(On Windows, use mvnw.cmd instead of ./mvnw.)

3. _Run the Application:_

   - Start the backend (Spring Boot) server.
   - Start the frontend (React) server.

4. _Configure Database:_

   - The application uses SQLite, and the database configuration is specified in the backend.

5. _Access the Application:_
   - Open your browser and navigate to the specified URL (usually http://localhost:3000).

## Acknowledgments

- ScoreCraft is developed by Team 16 for SER517 Capstone Project

We believe that ScoreCraft will significantly improve the efficiency and transparency of the project evaluation process.


## Prototype

- https://www.figma.com/file/THuFk9HsZGFhTHQ2w0UbT0/cap?type=design&node-id=2%3A2&mode=design&t=7Ec30qI9ccHIFX3S-1