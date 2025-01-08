document.getElementById("getInfo").addEventListener("click", sendGet);
document.getElementById("postInfo").addEventListener("click", sendPost);
document.getElementById("putInfo").addEventListener("click", sendPut);
document.getElementById("deleteInfo").addEventListener("click", sendDelete);
document.getElementById("resetInfo").addEventListener("click", resetInfo);

// more specific searches
document.getElementById("searchTitle").addEventListener("click", searchTitle);
document.getElementById("searchGenre").addEventListener("click", searchGenre);
document.getElementById("searchDate").addEventListener("click", searchDate);
document.getElementById("searchIsbn").addEventListener("click", searchIsbn);


// sends get request
function sendGet() {

    console.log("clicked");
    fetch("http://localhost:5001/buttons")
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log("here shitter");
            
            const container = document.getElementById("data-container");

            // Display data dynamically
            data.forEach(book => {
              const bookDiv = document.createElement("div");
              bookDiv.textContent = `${book.EntryId}: ${book.Title} - ${book.Genre} - ${book.Date} - ${book.ISBN}`;
              container.appendChild(bookDiv);
            });
            
        })
        .catch(error => {
            console.log("brah error", TypeError);
        })
}

// send specific search request
function searchTitle() {

    console.log("clicked specific search");
    let title = document.getElementById("inputTitle").value;
    console.log(title);
    let url = `http://localhost:5001/buttons/search/title?name=${title}`
    console.log(url);

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            const container = document.getElementById("data-container");

            data.forEach(book => {

                const bookDiv = document.createElement("div");
                bookDiv.textContent = `${book.EntryId}: ${book.Title} - ${book.Genre} - ${book.Date} - ${book.ISBN}`;
                container.appendChild(bookDiv);

            });
        })
        .catch(error => {
            console.log(error);
        })
    }

    // search genre
    function searchGenre() {

        console.log("clicked search genre");
        let genre = document.getElementById("inputGenre").value;
        console.log(genre);
        let url = `http://localhost:5001/buttons/search/genre?name=${genre}`;
        console.log(url);

        fetch(url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                const container = document.getElementById("data-container");

                data.forEach(book => {

                     newDiv = document.createElement("div");
                     newDiv.textContent = `${book.EntryId}: ${book.Title} - ${book.Genre} - ${book.Date} - ${book.ISBN}`;
                     container.appendChild(newDiv);

                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    // search by date
    function searchDate() {

        console.log("clicked search date");
        date = document.getElementById("inputDate").value;
        console.log(date);
        url = `http://localhost:5001/buttons/search/date?name=${date}`;

        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {

                const container = document.getElementById("data-container");
                
                data.forEach(book => {
                    newDiv = document.createElement("div");
                    newDiv.textContent = `${book.EntryId}: ${book.Title} - ${book.Genre} - ${book.Date} - ${book.ISBN}`;
                    container.appendChild(newDiv);
                })

            .catch(error => {
                console.log(error);
            })
            })

    }

    // search by isbn number
    function searchIsbn() {

        let isbn = document.getElementById("inputIsbn").value;
        url = `http://localhost:5001/buttons/search/isbn?name=${isbn}`;

        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {

                const container = document.getElementById("data-container");

                data.forEach(book => {
                    newDiv = document.createElement("div");
                    newDiv.textContent = `${book.EntryId}: ${book.Title} - ${book.Genre} - ${book.Date} - ${book.ISBN}`;
                    container.appendChild(newDiv);
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

    fetch("http://localhost:5001/buttons", {
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

    fetch("http://localhost:5001/buttons", {
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

    fetch("http://localhost:5001/buttons", {
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

// rest your screen
function resetInfo() {

    console.log("clicked reset");
 
    const container = document.getElementById("data-container");
    while (container.firstChild) {
      container.removeChild(container.lastChild);
    }


}





