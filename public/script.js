

// main loader
document.querySelector(".s-button-trigger").addEventListener("click", handleHTTP);

// handle all HTTP REQUESTS
function handleHTTP() {

    if (document.getElementById("filter-selector").value != null) {
        filter = document.getElementById("filter-selector").value;
        console.log(filter);

        if (filter == "title") {
            searchTitle();
        }
        else if (filter == "all") {
            sendGet();
        }
        else if (filter == "genre") {
            searchGenre();
        }
        else if (filter == "date") {
            searchDate();
        }
        else if (filter == "ISBN") {
            searchIsbn();
        }
        else if (filter == "Author") {
            searchAuthor();
        }
    }

}


// sends get request
function sendGet() {

    console.log("clicked");
    fetch("https://booknest.azurewebsites.net/buttons")
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log("here shitter");
            
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
            console.log("brah error", TypeError);
        })
}

// send specific search request
function searchTitle() {

    console.log("clicked specific search");
    let title = document.getElementById("search-bar").value;
    console.log(title, "here idiot");
    let url = `https://booknest.azurewebsites.net/buttons/search/title?name=${title}`

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            const container = document.getElementById("data-container");

            resetInfo();

            data.forEach(book => {

                // const bookDiv = document.createElement("div");
                // bookDiv.textContent = `${book.Title}: ${book.Genre} - ${book.Author} - ${book.Date} - ${book.ISBN}`;
                // container.appendChild(bookDiv);
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

// search author
function searchAuthor() {
    let author = document.getElementById("search-bar").value;
    console.log(author);
    let url = `https://booknest.azurewebsites.net/buttons/search/author?name=${author}`;

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {

            const container = document.getElementById("content-container");
            resetInfo();

            data.forEach(book => {

                // newDiv = document.createElement("div");
                // newDiv.textContent = `${book.Title}: ${book.Genre} - ${book.Author} - ${book.Date} - ${book.ISBN}`;
                // container.appendChild(newDiv);
                console.log(book);
                const bookCover = document.createElement("img");
                bookCover.src = book.Path;
                book.className = "book-item";
                container.appendChild(bookCover);
                bookCover.addEventListener("click", generatePage.bind(null, book.Title, book.Genre, book.Author, book.Date, book.ISBN, book.Path, book.Description));


            })

        })
        .catch(error => {
            console.log(error);
        })

}

// search genre
function searchGenre() {

    console.log("clicked search genre");
    let genre = document.getElementById("search-bar").value;
    console.log(genre);
    let url = `https://booknest.azurewebsites.net/buttons/search/genre?name=${genre}`;

    fetch(url)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
            const container = document.getElementById("data-container");
            resetInfo();

            data.forEach(book => {

                    // newDiv = document.createElement("div");
                    // newDiv.textContent = `${book.Title}: ${book.Genre} - ${book.Author} - ${book.Date} - ${book.ISBN}`;
                    // container.appendChild(newDiv);

                    const bookCover = document.createElement("img");
                    bookCover.src = book.Path;
                    bookCover.className = "book-item";
                    container.appendChild(bookCover);
                    bookCover.addEventListener("click", generatePage.bind(null, book.Title, book.Genre, book.Author, book.Date, book.ISBN, book.Path, book.Description));


            })
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
    url = `https://booknest.azurewebsites.net/buttons/search/date?name=${date}`;

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {

            const container = document.getElementById("data-container");
            // bookCover = document.createElement("img");
            // bookCover.src = "./photos/babel.jpg";
            // bookCover.className = "book-item";
            // container.appendChild(bookCover);

            resetInfo();
            
            data.forEach(book => {
                // newDiv = document.createElement("div");
                // newDiv.textContent = `${book.Title}: ${book.Genre} - ${book.Author} - ${book.Date} - ${book.ISBN}`;
                // container.appendChild(newDiv);

                const bookCover = document.createElement("img");
                bookCover.src = book.Path;
                bookCover.className = "book-item";
                container.appendChild(bookCover);
                bookCover.addEventListener("click", generatePage.bind(null, book.Title, book.Genre, book.Author, book.Date, book.ISBN, book.Path, book.Description));

            })

        .catch(error => {
            console.log(error);
        })
        })

}

// search by isbn number
function searchIsbn() {

    let isbn = document.getElementById("search-bar").value;
    url = `https://booknest.azurewebsites.net/buttons/search/isbn?name=${isbn}`;

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {

            const container = document.getElementById("data-container");
            resetInfo();

            data.forEach(book => {
                // newDiv = document.createElement("div");
                // newDiv.textContent = `${book.Title}: ${book.Genre} - ${book.Author} - ${book.Date} - ${book.ISBN}`;
                // container.appendChild(newDiv);

                const bookCover = document.createElement("img");
                bookCover.src = book.Path;
                bookCover.className = "book-item";
                container.appendChild(bookCover);
                bookCover.addEventListener("click", generatePage.bind(null, book.Title, book.Genre, book.Author, book.Date, book.ISBN, book.Path, book.Description));

            })

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

    fetch("https://booknest.azurewebsites.net/buttons", {
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

    fetch("https://booknest.azurewebsites.net/buttons", {
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

    fetch("https://booknest.azurewebsites.net/buttons", {
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

    const url = `https://booknest.azurewebsites.net/bookPage?title=${title}&genre=${genre}&author=${author}&date=${date}&isbn=${ISBN}&path=${path}&desc=${desc}`;
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





