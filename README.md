# SER517_Team16

# ScoreCraft

ScoreCraft is an innovative grading application designed to streamline the assessment process for educators. With a user-friendly interface and comprehensive features, ScoreCraft simplifies grading while enhancing feedback and efficiency.

## Technology Stack

-   _Frontend:_ React
-   _Backend:_ Spring Boot
-   _Database:_ MySQL

## Setup Instructions

1. _Clone the Repository:_

    git clone https://github.com/jyo3003/SER517_Team16.git

    Switch to the Development Branch:

    git checkout DevBranch

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

Harshavardhan Bodepudi
Jyothirmai Kantipudi
Mohana Deepthi Karumanchi
Sai Viswas Nirukonda
Sri Shashank Mandava
Manideep Nalluri

We believe that ScoreCraft will significantly improve the efficiency and transparency of the project evaluation process.
