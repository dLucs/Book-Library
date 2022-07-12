const bookList = document.querySelector(".booklist");
const bookCards = document.querySelector(".booklist__books");
let library = JSON.parse(localStorage.getItem("library") || "[]");

const bookCollection = bookList.querySelector(".booklist__books");

// ---------------------- Book Constructor -------------------------------
class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

// ---------------------- Add a new book to list -------------------------------

bookList.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("new-book").value.trim();
  const author = document.getElementById("author").value.trim();
  const pages = document.getElementById("pages").value.trim();
  const status = "Unread";

  if (!title) return;
  if (!author) return;
  if (!pages) return;

  const book = new Book(title, author, pages, status);
  const bookElement = document.createElement("li");
  library.push(book);

  bookElement._book = book;

  library.forEach((book) => {
    bookElement.classList.add("book");

    bookElement.innerHTML = DOMPurify.sanitize(` <span class="book__info"
      ><span class="title_info">${title}</span> ⏤ <span class="author_info">${author}</span> ⏤ <span class="pages_info">${pages} Pages</span></span
    >
    <button class="book__read-button">Unread</button>
    <button type="button" class="book__delete-button">
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="192"
    height="192"
    fill="#fff"
    viewBox="0 0 256 256"
  >
    <rect width="256" height="256" fill="none"></rect>
    <line
      x1="200"
      y1="56"
      x2="56"
      y2="200"
      stroke="#fff"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="30"
    ></line>
    <line
      x1="200"
      y1="200"
      x2="56"
      y2="56"
      stroke="#fff"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="30"
    ></line>
  </svg>
    </button>`);
    bookCollection.appendChild(bookElement);

    clearInputs();
    document.getElementById("new-book").focus();
    localStorage.setItem("library", JSON.stringify(library));
  });
});

function clearInputs() {
  document.querySelector("#new-book").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
}

//-------------------Toggle Read or Unread Button --------------------------

bookList.addEventListener("click", (e) => bookEdit(e));
function bookEdit(event) {
  if (event.target.classList.contains("book__read-button")) {
    event.target.textContent =
      event.target.textContent == "Unread" ? "Read" : "Unread";

    //update object
    if (event.target.parentNode._book)
      event.target.parentNode._book.status = event.target.textContent;

    localStorage.setItem("library", JSON.stringify(library));
    console.log(library);
  }
  //-------------------Deleting Books --------------------------

  if (event.target.matches(".book__delete-button")) {
    const bookElement = event.target.parentElement;
    bookCards.removeChild(bookElement);
    const position = library.indexOf(event.target.parentNode._book);
    library.splice(position, 1);
    localStorage.setItem("library", JSON.stringify(library));

    console.log(library);
  }
}

// map/transform raw book data items each into a `Book` instance ...
const listOfBookInstances = library.map(
  (library) =>
    new Book(library.title, library.author, library.pages, library.status)
);
console.log("listOfBookInstances :", listOfBookInstances);
library = listOfBookInstances;

function render() {
  listOfBookInstances.forEach((Book) => {
    const bookElement = document.createElement("li");
    bookElement._book = Book;

    bookElement.classList.add("book");
    bookElement.innerHTML = DOMPurify.sanitize(` <span class="book__info"
      ><span class="title_info">${Book.title}</span> ⏤ <span class="author_info">${Book.author}</span> ⏤ <span class="pages_info">${Book.pages} Pages</span></span
    >
    <button class="book__read-button">${Book.status}</button>
    <button type="button" class="book__delete-button">
    <svg
                xmlns="http://www.w3.org/2000/svg"
                width="192"
                height="192"
                fill="#fff"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none"></rect>
                <line
                  x1="200"
                  y1="56"
                  x2="56"
                  y2="200"
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="30"
                ></line>
                <line
                  x1="200"
                  y1="200"
                  x2="56"
                  y2="56"
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="30"
                ></line>
              </svg>
    </button>`);

    bookCollection.appendChild(bookElement);
  });
}
if (bookCards.children.length === 0) {
  bookCards.innerHTML = "";
}

render();
