# Full-Stack Book Store Project
This is a full-stack web application for managing a bookstore. The front-end is built with HTML, CSS, and JavaScript, providing a user-friendly interface for searching, filtering, checking out, and returning books. The back-end server is developed using Node.js with the Express framework, handling server-side routing and business logic. It communicates with a MySQL database to efficiently store, retrieve, and manage book data, such as titles, genres, publication dates, and ISBNs.

The application uses a RESTful API to handle CRUD (Create, Read, Update, Delete) operations. HTTP methods like GET, POST, PUT, and DELETE are used to perform actions on book entries. The server processes incoming requests, interacts with the database using SQL queries, and returns the appropriate responses to the front-end. This project demonstrates my ability to build a full-stack system that integrates front-end interfaces with back-end APIs and a relational database.

For the book information pages, I implemented server-side rendering using Node.js with Express. When a user requests a specific book’s details, the server dynamically generates the HTML by fetching the book’s data from the MySQL database. This approach improves performance by reducing client-side processing and ensures faster load times, especially for users with slower devices. It also enhances SEO since the content is rendered on the server before being sent to the browser.

Here is a link to the demo video: https://www.youtube.com/watch?v=ZOzlvGD2Fys

## Features:
- View a list of books from the database.
- Search and filter for books by title, genre, date, or ISBN.

## Tech Stack:
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MySQL

## Next Steps 
- Finish the user account system and checkout feature
- Currently working on live hosting the website through microsoft Azure
q