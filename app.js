// function for toggole
const toggole = (id, property) => {
    document.getElementById(id).style.display = property;
}

const loadBooks = () => {
    const searchField = document.getElementById('search-text');
    const searchText = searchField.value;
    console.log(searchText);
    //Clear input field 
    searchField.value = '';

    // toggole 
    toggole('spinner', 'block')
    toggole('book-section', 'none')
    toggole('results-amount', 'none')

    // calling api and load data 
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.docs, data))
}

const displayBooks = (books, data) => {

    // removing nothing found 
    const NothingFound = document.getElementById('nothing-found');
    NothingFound.textContent = '';

    // showing results amount
    const resultAmount = document.getElementById('results-amount');

    resultAmount.innerText = books.length
    const booksContainer = document.getElementById('books');


    // romoving books from container
    booksContainer.textContent = '';

    // appending books in container 
    if (books.length > 0) {
        books.forEach(book => {
            const div = document.createElement("div");
            div.classList = 'col';
            div.innerHTML = `
         <div class="card h-100">
                     <img class="img-size" src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i: 10909258}-M.jpg" class="card-img-top" alt="...">
                     <div class="card-body">
                       <h6 class="card-title">${book.title}</h6>
                       <p class="card-text">Author: ${book.author_name}</p>
                       <p class="card-text">Published: ${book.first_publish_year}</p>
                     </div>
                   </div>
         `
            booksContainer.appendChild(div);

        })


    }

    // showing nothing found
    else if (books.length === 0) {
        const NothingFound = document.getElementById('nothing-found');
        const div = document.createElement('div');
        div.innerHTML = `
     <h1>Nothing found</h1> 
     <h4>No results containing all your search terms were found.</h4> 
   <ul>
     Suggestions:
     <li>Make sure that all words are spelled correctly.</li>
     <li>Try different keywords.</li>
     <li>
         Try fewer keywords.
         </li>
   </ul>`
        NothingFound.appendChild(div)
    }


    // toggole
    toggole('spinner', 'none')
    toggole('book-section', 'block')
    toggole('results-amount', 'block')
}