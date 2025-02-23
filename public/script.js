//load all books from database when page loads
sendGet();

// main loader
document.querySelector(".s-button-trigger").addEventListener("click", handleHTTP);

// handle all HTTP REQUESTS
function handleHTTP() {

    if (document.getElementById("filter-selector").value != null) {

        filter = document.getElementById("filter-selector").value;
        const searchInput = document.getElementById("search-bar").value.trim();
        console.log(filter);

        if (filter == "title") {
            //display error message if empty
            if (searchInput === "") {
                searchError();
            }
            else {
                searchTitle();
            }
        }

        else if (filter == "all") {
            if (searchInput === "") {
                sendGet();
            }
            else {
                searchAll();
            }
        }

        else if (filter == "genre") {
            if (searchInput === "") {
                searchError();
            }
            else {
                searchGenre();
            }
        }

        else if (filter == "date") {
            if (searchInput === "") {
                searchError();
            }
            else {
                searchDate();
            }
        }

        else if (filter == "ISBN") {
            if (searchInput === "") {
                searchError();
            }
            else {
                searchIsbn();
            }
        }

        else if (filter == "author") {
            if (searchInput === "") {
                searchError();
            }
            else {
                searchAuthor();
            }
        }
    }

}


// sends get request
function sendGet() {

    console.log("clicked");
    fetch("https://booknest-app-apeya0djb3bjanf0.canadaeast-01.azurewebsites.net/buttons")
        .then(response => {
            //debugging for sql error
            if (!response.ok) {

                return response.json().then(errorData => {
                    console.error('Error code:', errorData.code);
                    console.error('Error message:', errorData.message);
                    console.error('SQL Error:', errorData.sqlMessage);
                    alert(`An error occurred: ${errorData.message}`);
                    throw new Error(errorData.message);
                });

            }
            return response.json();
        })
        .then(data => {
            console.log("here buddy");
            
            const container = document.getElementById("data-container");
            resetInfo();

            // Display data dynamically
            data.forEach(book => {

                const bookCover = document.createElement("img");
                bookCover.src = book.Path;
                bookCover.className = "book-item";
                container.appendChild(bookCover);
                bookCover.addEventListener("click", generatePage.bind(null, book.Title, book.Genre, book.Author, book.Date, book.ISBN, book.Path, book.Description));

            });

            
        })
        .catch(error => {
            console.log(error);
        })
}

// search all criteria - general search
function searchAll() {

    let search = document.getElementById("search-bar").value;
    
    search = search.toLowerCase();

    let url = `https://booknest-app-apeya0djb3bjanf0.canadaeast-01.azurewebsites.net/buttons/search/all?search=${search}`;

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {

            console.log(data);
            const container = document.getElementById("data-container");

            resetInfo();

            // if the search returned no matches display error message
            if (data.length == 0) {
                noMatches();
            }

            else {

                // probably should have made this a function - go back and change later
                data.forEach(book => {

                    const bookCover = document.createElement("img");
                    bookCover.src = book.Path;
                    bookCover.className = "book-item";
                    container.appendChild(bookCover);
                    bookCover.addEventListener("click", generatePage.bind(null, book.Title, book.Genre, book.Author, book.Date, book.ISBN, book.Path, book.Description));
    
                });

            }

        })
        .catch(error => {
            console.log(error);
        })
}

// send specific search request
function searchTitle() {

    console.log("clicked specific search");
    let title = document.getElementById("search-bar").value;
    title = title.toLowerCase();

    console.log(title, "here is title");

    let url = `https://booknest-app-apeya0djb3bjanf0.canadaeast-01.azurewebsites.net/buttons/search/title?name=${title}`;

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            const container = document.getElementById("data-container");

            resetInfo();

            if (data.length == 0) {
                noMatches();
            }

            else {

                data.forEach(book => {

                    const bookCover = document.createElement("img");
                    bookCover.src = book.Path;
                    bookCover.className = "book-item";
                    container.appendChild(bookCover);
                    bookCover.addEventListener("click", generatePage.bind(null, book.Title, book.Genre, book.Author, book.Date, book.ISBN, book.Path, book.Description));
    
                });

            }

        })
        .catch(error => {
            console.log(error);
        })
    }

// search author
function searchAuthor() {
    let author = document.getElementById("search-bar").value;
    author = author.toLowerCase();

    console.log(author);
    let url = `https://booknest-app-apeya0djb3bjanf0.canadaeast-01.azurewebsites.net/buttons/search/author?name=${author}`;

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {

            const container = document.getElementById("data-container");
            resetInfo();

            if (data.length == 0) {
                noMatches();
            }

            else {

                data.forEach(book => {

                    console.log(book);
                    const bookCover = document.createElement("img");
                    bookCover.src = book.Path;
                    bookCover.className = "book-item";
                    container.appendChild(bookCover);
                    bookCover.addEventListener("click", generatePage.bind(null, book.Title, book.Genre, book.Author, book.Date, book.ISBN, book.Path, book.Description));
    
                })

            }

        })
        .catch(error => {
            console.log(error);
        })
}

// search genre
function searchGenre() {

    console.log("clicked search genre");
    let genre = document.getElementById("search-bar").value;
    genre = genre.toLowerCase();

    console.log(genre);
    let url = `https://booknest-app-apeya0djb3bjanf0.canadaeast-01.azurewebsites.net/buttons/search/genre?name=${genre}`;

    fetch(url)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
            const container = document.getElementById("data-container");
            resetInfo();

            // no matches found - display error message
            if (data.length == 0) {
                noMatches();
            }

            else {

                data.forEach(book => {

                    const bookCover = document.createElement("img");
                    bookCover.src = book.Path;
                    bookCover.className = "book-item";
                    container.appendChild(bookCover);
                    bookCover.addEventListener("click", generatePage.bind(null, book.Title, book.Genre, book.Author, book.Date, book.ISBN, book.Path, book.Description));

                })

            }

        })
        .catch(error => {
            console.log(error);
        })
}

// search by date
function searchDate() {

    console.log("clicked search date");
    date = document.getElementById("search-bar").value;

    console.log(date);
    url = `https://booknest-app-apeya0djb3bjanf0.canadaeast-01.azurewebsites.net/buttons/search/date?name=${date}`;

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {

            const container = document.getElementById("data-container");

            resetInfo();

            // no matches found - display error message
            if (data.length == 0) {
                noMatches();
            }

            else {

                data.forEach(book => {

                    const bookCover = document.createElement("img");
                    bookCover.src = book.Path;
                    bookCover.className = "book-item";
                    container.appendChild(bookCover);
                    bookCover.addEventListener("click", generatePage.bind(null, book.Title, book.Genre, book.Author, book.Date, book.ISBN, book.Path, book.Description));
    
                })
            }
        })
        .catch(error => {
            console.log(error);
        })
}



// search by isbn number
function searchIsbn() {

    let isbn = document.getElementById("search-bar").value;
    url = `https://booknest-app-apeya0djb3bjanf0.canadaeast-01.azurewebsites.net/buttons/search/isbn?name=${isbn}`;

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {

            const container = document.getElementById("data-container");
            resetInfo();

            // no matches found - display error message
            if (data.length == 0) {
                noMatches();
            }

            else {

                data.forEach(book => {

                    const bookCover = document.createElement("img");
                    bookCover.src = book.Path;
                    bookCover.className = "book-item";
                    container.appendChild(bookCover);
                    bookCover.addEventListener("click", generatePage.bind(null, book.Title, book.Genre, book.Author, book.Date, book.ISBN, book.Path, book.Description));
    
                })
            }
        })
        .catch(error => {
            console.log(error);
        })
}


// sends post request
function sendPost() {
        // set up fetch
    console.log("clicked");
    let title = document.getElementById("inputTitle").value;
    let genre = document.getElementById("inputGenre").value;
    let date = document.getElementById("inputDate").value;
    let ISBN = document.getElementById("inputIsbn").value;

    fetch("", {
        "method": "POST",
        "headers": {
            'Content-Type': 'application/json'},
        "body": JSON.stringify({"Title": title, "Genre": genre, "Date": date, "ISBN": ISBN})
        })
    .then(data => {
        console.log("heyy its working", data);
    })
    .catch(error => {
        console.log("brah error");
    })
    
}

// sends put request
function sendPut() {
    console.log("clicked");

    let title = document.getElementById("inputTitle").value;
    let genre = document.getElementById("inputGenre").value;
    let date = document.getElementById("inputDate").value;
    let ISBN = document.getElementById("inputIsbn").value;
    let id = document.getElementById("replaceNum").value;

    fetch("", {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"},
        "body": JSON.stringify({"EntryId": id, "Title": title, "Genre": genre, "Date": date, "ISBN": ISBN})

        })
    .then(data => {
        console.log("heyy its working", data);
    })
    .then(error => {
        console.log("broo your selling");
    })
}

// send a delete request
function sendDelete() {

    console.log("front end clicked");

    let id = document.getElementById("replaceNum").value;
    console.log(id);

    fetch("", {
        "method": "DELETE",
        "headers": {
            "Content-Type": "application/json"},
        "body": JSON.stringify({"id": id})
        })

    .then(data => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
    })
    .then(data => {
        console.log("heyy its working", data);
    })
    .catch(error => {
        console.log("brah error");
        console.log(error);
    })

}

// generate new page for book 
function generatePage(title, genre, author, date, ISBN, path, desc) {

    const url = `https://booknest-app-apeya0djb3bjanf0.canadaeast-01.azurewebsites.net/bookPage?title=${title}&genre=${genre}&author=${author}&date=${date}&isbn=${ISBN}&path=${path}&desc=${desc}`;
    // keep track of prev page visited
    window.history.pushState({}, '', url);

    console.log(url);

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); // Assuming server returns HTML, not JSON
    })
    .then(html => {
        document.body.innerHTML = html; // Replace body content with the rendered page
    })
    .catch(error => {
        console.log("brah error:", error);
    });


}

// allows the user to click back to get to previous page
window.addEventListener('popstate', (event) => {
    console.log('Back button was clicked');
    const state = event.state;
    if (state) {
        generatePage(state.title, state.genre, state.author, state.date, state.isbn, state.path);
    } else {
        window.location.href = '/';  
    }
});

// add links to checkout/information page for the carousel books
window.addEventListener("load", () => {

    const caroBooks = document.getElementsByClassName("book");
    console.log(caroBooks);

})



// rest your screen
function resetInfo() {

    console.log("clicked reset");
 
    const container = document.getElementById("data-container");
    while (container.firstChild) {
      container.removeChild(container.lastChild);
    }


}

function searchError() {

    const container = document.getElementById("data-container");
    let prevError = document.querySelector(".error-message");
    resetInfo();

    const errorMessage = document.createElement("div");
    errorMessage.textContent = "Search field cannot be empty.";
    errorMessage.className = "error-message";
    container.appendChild(errorMessage);

}

function noMatches(data) {

    const container = document.getElementById("data-container");
    const errorMessage = document.createElement("div");
    errorMessage.ClassName = "error-message";

    errorMessage.textContent = "No Results Found";
    container.appendChild(errorMessage);

}





