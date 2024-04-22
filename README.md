# SER517_Team16

# ScoreCraft

ScoreCraft is an innovative grading application designed to streamline the assessment process for educators. With a user-friendly interface and comprehensive features, ScoreCraft simplifies grading while enhancing feedback and efficiency.

## Technology Stack

-   _Frontend:_ React
-   _Backend:_ Spring Boot
-   _Database:_ MySQL

## Installation of Required Software

To run ScoreCraft on your local machine, you'll need to install the following software:

### 1. Node.js and React (Frontend)

ScoreCraft's frontend is built using React, a JavaScript library for building user interfaces.

#### Installation Steps:

1. Install Node.js: Visit the [Node.js website](https://nodejs.org/en/download) and download the appropriate installer for your operating system. Follow the installation instructions.

    Open the terminal and run the following

    # verifies the right Node.js version is in the environment

    node -v # should print `v20.12.2`

    # verifies the right NPM version is in the environment

    npm -v # should print `10.5.0`

### 2. Java and Spring Boot (Backend)

ScoreCraft's backend is built using Spring Boot, a Java-based framework for building web applications.

#### Installation Steps:

If you have Java already installed on your device you can skip this step

1. Install Java: Visit the [Java SE Downloads](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) page and download the appropriate JDK installer for your operating system. Follow the installation instructions.

### 3. MySQL (Database)

ScoreCraft uses MySQL as its database management system.

#### Installation Steps:

1. Install MySQL: Visit the [MySQL Downloads](https://dev.mysql.com/downloads/mysql/) page and download the appropriate installer for your operating system. Follow the installation instructions.

2. Set up MySQL: After installation, start the MySQL server and open a terminal or command prompt. Run the following commands to create a new database named "capstone" and obtain the JDBC URL:

    mysql -u root -p

Enter your MySQL root password when prompted.

CREATE DATABASE capstone;

This command creates a new database named "capstone".

SHOW VARIABLES LIKE 'port';

This command will show the port number on which MySQL server is running. Note down the port number.

SHOW VARIABLES LIKE 'hostname';

This command will show the hostname of MySQL server. Note down the hostname.

3. Obtain JDBC URL: Use the following format to construct the JDBC URL for connecting to the "capstone" database:

    jdbc:mysql://hostname:port/capstone

You will use the above JDBC URL later to connect to the "capstone" database

Replace `<hostname>` with the hostname obtained from the previous step and `<port>` with the port number.

Once you have installed the required software and set up the MySQL database, you can follow the setup instructions provided in the [Setup Instructions](#setup-instructions) section to clone the repository and run ScoreCraft on your local machine.

## Setup Instructions

1. _Clone the Repository:_

    git clone https://github.com/jyo3003/SER517_Team16.git

    Switch to the Development Branch:

    git checkout DevBranch

    Open applicaton.properties file and update the JDBC URL and password

    In the end it should look something like this:

    Example:

    # Database properties

    spring.datasource.url=jdbc:mysql://127.0.0.1:3306/capstone
    spring.datasource.username=root
    spring.datasource.password=Scooby@123

2. _Run the Application:_

    open the terminal

    make sure you are in the right directory (i.e SER517_TEAM16)

    run the following two commands:

    chmod +x start.sh

    ./start.sh

3. _Access the Application:_
    - Open your browser and navigate to the specified URL (usually http://localhost:3000).

## Features

### User Interface and Experience:

-   **Minimalist Design**: Focuses on functionality for ease of use.
-   **Individual and Group Assessments**: Offers tailored grading options for both.
-   **Clear Distinction**: Between individual and group assessments with tailored grading rubrics.
-   **Student List**: Displays names, associated student IDs, and checkboxes for grading completion.
-   **Excel File Upload**: Supports importing student and grading criteria data.

### Functionality and Flexibility:

-   **Customizable Grading**: Educators can arrange, edit, or add grading criteria.
-   **Export Options**: Downloadable assessment reports for data analysis and sharing.
-   **Efficient Input**: Predefined rubrics and comments minimize errors and repetitive tasks.
-   **Real-time Score Calculation**: Automates tallying and facilitates efficient grading.
-   **Group Grading**: Assign scores to individuals or entire groups with checkboxes.
-   **Final Review Stage**: Allows for confirmation before submitting grades.
-   **Real-time Feedback**: Enables immediate interaction and collaboration.
-   **Downloadable Reports**: Enhances functionality for reviewing and analyzing performance data.

## Motivation and Goal

ScoreCraft aims to simplify grading, saving educators time while providing transparent and fair assessments to students. By addressing the inefficiencies of traditional grading systems and integrating with educational platforms, ScoreCraft enhances the grading process.

## Target Audience

Educators and grading staff seeking an efficient, transparent grading system benefit from ScoreCraft's features and functionality.

## Application Workflow

### 1. Home Page Selection:

-   Users select the type of assessment: Group or Individual.
-   Group assessment involves pre-divided student groups with associated group numbers.
-   Users upload an Excel file containing student and grading criteria details.

### 2. Individual Assessment:

-   Users access the Individual Main Page.
-   All students extracted from the Excel file are displayed.
-   Each student has a checkbox indicating grading completion and a button to access the grading page.

### 3. Group Assessment:

-   Users access the Group Main Page listing all groups.
-   Clicking on a group reveals its students.
-   A checkbox next to each group indicates grading completion for all students in that group.

### 4. Grading Page:

-   Users encounter a table with grading criteria information.
-   Options to rearrange, edit, delete, or add grading criteria are available.
-   Predefined comments with scores streamline feedback.
-   Adding or updating criteria is facilitated through a modal form.
-   Scores and comments can be assigned to entire groups using checkboxes.

### 5. Finalization and Export:

-   After grading, users return to the Individual or Group Main Page.
-   Graded students are marked with checkboxes.
-   Users can export data to an Excel file for further analysis and record-keeping.

## Acknowledgments

-   ScoreCraft is developed by Team 16 for SER517 Capstone Project

## Team Members

-   Harshavardhan Bodepudi
-   Jyothirmai Kantipudi
-   Mohana Deepthi Karumanchi
-   Sai Viswas Nirukonda
-   Sri Shashank Mandava
-   Manideep Nalluri

We believe that ScoreCraft will significantly improve the efficiency and transparency of the project evaluation process.
