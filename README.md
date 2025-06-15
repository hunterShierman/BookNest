# Full-Stack Online Library Project
This is a full-stack web application for managing an online Library. The front-end is built with HTML, CSS, and JavaScript, providing a user-friendly interface for searching and filtering for books. The back-end server is developed using Node.js with the Express framework, handling server-side routing and business logic. It communicates with a MySQL database to efficiently store, retrieve, and manage book data, such as titles, genres, publication dates, and ISBNs.

The application uses a RESTful API to handle CRUD (Create, Read, Update, Delete) operations. HTTP methods like GET, POST, PUT, and DELETE are used to perform actions on book entries. The server processes incoming requests, interacts with the database using SQL queries, and returns the appropriate responses to the front-end.

For the book information pages, I implemented server-side rendering using Node.js with Express. When a user requests a specific book’s details, the server dynamically generates the HTML by fetching the book’s data from the MySQL database.

## Hosting on Azure:
The application is now hosted on Azure using the Azure App Service for seamless deployment. I used the Azure Database for MySQL service to host the relational database, allowing for secure, scalable database access. The server-side code is deployed on Azure's cloud infrastructure, ensuring high availability and performance.

To automate deployments, I configured a CI/CD pipeline with GitHub Actions, which continuously integrates and deploys updates from the GitHub repository to the live application. This ensures that any new changes pushed to the repository are automatically built, tested, and deployed, keeping the website up-to-date with minimal manual intervention.

Here is a link to the demo video: https://www.youtube.com/watch?v=SyOCbhsD6iU


## Features:
- View a list of books from the database.
- Search and filter for books by title, genre, date, or ISBN.

## Tech Stack:
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MySQL
- Hosting: Azure App Service, Azure Database for MySQL

## Next Steps 
- Finish the user account system and checkout feature
- Optimize website for smaller screen sizes
