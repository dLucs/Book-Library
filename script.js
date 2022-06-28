const readButtons = document.querySelectorAll(".book__read-button");
const bookList = document.querySelector(".booklist");

//-------------------Toggle Read or Unread Button --------------------------

readButtons.forEach((readButton) => {
  let clickCount = 0;

  readButton.addEventListener("click", (e) => {
    e.target.classList.toggle("clicked");

    clickCount += 1;

    if (clickCount % 2 == 0) {
      readButton.textContent = "Unread";
    } else {
      readButton.textContent = "Read";
    }
  });
});

// ---------------------- Add a new book to list -------------------------------

bookList.addEventListener("submit", (event) => {
  event.preventDefault();
  //add a new book
});
