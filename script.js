// Define the array to store the issued books
let issuedBooks = [];

// Get the form and table elements from the DOM
const issuanceForm = document.querySelector('form');
const issuedBooksTable = document.getElementById('issued-books-table');

// Listen for form submission
issuanceForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get the book name and issued to values from the form
  const bookName = document.getElementById('book-name').value;
  const issuedTo = document.getElementById('issued-to').value;

  // Create a new issued book object
  const newIssuedBook = {
    id: issuedBooks.length + 1,
    book_name: bookName,
    issued_to: issuedTo,
    issued_time: new Date().toLocaleString(),
    status: ""
  };

  // Add the new issued book to the array
  issuedBooks.push(newIssuedBook);

  // Clear the form input fields
  issuanceForm.reset();

  // Render the issued books table
  renderIssuedBooksTable();
});

// Render the issued books table
function renderIssuedBooksTable() {
  // Clear the existing table rows
  while (issuedBooksTable.rows.length > 1) {
    issuedBooksTable.deleteRow(1);
  }

  // Add the issued books to the table
  issuedBooks.forEach(function(book) {
    const row = issuedBooksTable.insertRow(-1);
    row.insertCell(0).textContent = book.id;
    row.insertCell(1).textContent = book.book_name;
    row.insertCell(2).textContent = book.issued_to;
    row.insertCell(3).textContent = book.issued_time;
    const statusCell = row.insertCell(4);
    statusCell.textContent = book.status;
    statusCell.setAttribute("contenteditable", "true");
    statusCell.classList.toggle("red", book.status === "not returned");
    statusCell.classList.toggle("green", book.status === "returned");

    // Listen for status cell changes
    statusCell.addEventListener('blur', function() {
      const newStatus = statusCell.textContent.trim().toLowerCase();
      if (newStatus === "returned" || newStatus === "not returned") {
        book.status = newStatus;
        statusCell.classList.toggle("red", book.status === "not returned");
        statusCell.classList.toggle("green", book.status === "returned");
      } else {
        statusCell.textContent = book.status;
      }
    });
  });
}