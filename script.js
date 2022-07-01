const readButtons = document.querySelectorAll(".book__read-button");
const bookList = document.querySelector(".booklist");

let library = [];

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
  const status = document.querySelector(".book__read-button").textContent;

  if (!title) return;
  if (!author) return;
  if (!pages) return;

  const book = new Book(title, author, pages, status);

  library.push(book);

  const bookElement = document.createElement("li");
  const bookCollection = bookList.querySelector(".booklist__books");

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
  });
});

function clearInputs() {
  document.querySelector("#new-book").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
}

//-------------------Toggle Read or Unread Button --------------------------

bookList.addEventListener("click", (e) => bookRead(e));

function bookRead(event) {
  if (event.target.classList.contains("book__read-button")) {
    console.log(event.target);
    event.target.classList.toggle("clicked");
    event.target.textContent =
      event.target.textContent == "Unread" ? "Read" : "Unread";
  }
}
