let readButton = document.getElementById("book__read-button");
let clickCount = 0;

readButton.addEventListener("click", () => {
  readButton.classList.toggle("clicked");
  clickCount += 1;

  if (clickCount % 2 == 0) {
    readButton.textContent = "Unread";
  } else {
    readButton.textContent = "Read";
  }
});
