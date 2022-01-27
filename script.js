let myLibrary = [];

const libraryTab = document.getElementById('libraryTab');

function Book (title, author, pages, read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read
};

Book.prototype.info = function () {
  return 'NAME : ' + this.title + ' | AUTHOR : ' + this.author + ' | NUMBER OF PAGES : ' + this.pages + ' | READ : ' + this.read;
};

function addBookToLibrary() {
  const title = prompt('Please enter the name of the book to add to the library : ').toUpperCase();
  const author = prompt('Please enter the name of its author : ').toUpperCase();
  const pages = prompt('Please enter the number of pages this book contains : ');
  let read = prompt('Please enter if you read it or not (Y for Yes/N for No) : ').toUpperCase();
  if(read === 'Y') {
    read = 'YES';
  }
  else if(read === 'N') {
    read = 'NO';
  }
  if (title !== null && author !== null && pages !== null) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
  }
  displayLibrary(myLibrary);
}

function deleteBook(event) {
  myLibrary.splice((event.target.id - 1), 1);
  displayLibrary(myLibrary);
}

function changeReadStatus(event) {
  if(myLibrary[(event.target.id - 1)].read === 'YES') {
    myLibrary[(event.target.id - 1)].read = 'NO';
  }
  else if(myLibrary[(event.target.id - 1)].read === 'NO') {
    myLibrary[(event.target.id - 1)].read = 'YES';
  }
  displayLibrary(myLibrary);
}

function displayLibrary(library) {
  const oldLibraryContent = document.getElementById('libraryContent');
  console.log(oldLibraryContent);
  if(oldLibraryContent !== null){
    libraryTab.removeChild(oldLibraryContent);
  }

  const newLibraryContent = document.createElement('div');
  newLibraryContent.id = 'libraryContent';

  const defaultLine = document.createElement('div');
  defaultLine.id = 'defaultLine';
  defaultLine.className = 'bookLine';

  const nameDiv = document.createElement('div');
  nameDiv.id = 'nameDiv';
  nameDiv.className = 'nameDiv cell color1';
  nameDiv.innerHTML = 'NAME';
  defaultLine.appendChild(nameDiv);

  const authorDiv = document.createElement('div');
  authorDiv.id = 'authorDiv';
  authorDiv.className = 'authorDiv cell color1';
  authorDiv.innerHTML = 'AUTHOR';
  defaultLine.appendChild(authorDiv);

  const pagesDiv = document.createElement('div');
  pagesDiv.id = 'pagesDiv';
  pagesDiv.className = 'pagesDiv cell color1';
  pagesDiv.innerHTML = 'PAGES';
  defaultLine.appendChild(pagesDiv);

  const statusDiv = document.createElement('div');
  statusDiv.id = 'statusDiv';
  statusDiv.className = 'statusDiv cell color1';
  statusDiv.innerHTML = 'READ';
  defaultLine.appendChild(statusDiv);

  newLibraryContent.appendChild(defaultLine);
    
    for (let book in library) {
      const newBook = document.createElement('div');
      newBook.id = Number(book) + 1;
      newBook.className = 'bookLine';

      const bookName = document.createElement('div');
      bookName.id = 'bookName';
      bookName.className = 'bookName cell color2';
      bookName.innerHTML = library[book].title;
      newBook.appendChild(bookName);

      const authorName = document.createElement('div');
      authorName.id = 'authorName';
      authorName.className = 'authorName cell color2';
      authorName.innerHTML = library[book].author;
      newBook.appendChild(authorName);

      const pagesNumber = document.createElement('div');
      pagesNumber.id = 'pagesNumber';
      pagesNumber.className = 'pagesNumber cell color2';
      pagesNumber.innerHTML = library[book].pages;
      newBook.appendChild(pagesNumber);

      const readStatus = document.createElement('div');
      readStatus.id = 'readStatus';
      readStatus.className = 'readStatus cell color2';
      readStatus.innerHTML = library[book].read;
      newBook.appendChild(readStatus);

      const changeStatusButton = document.createElement('button');
      changeStatusButton.id = newBook.id;
      changeStatusButton.className = 'changeReadStatus cell info';
      changeStatusButton.innerHTML = 'CHANGE READ STATUS';
      newBook.appendChild(changeStatusButton);

      const deleteBookButton = document.createElement('button');
      deleteBookButton.id = newBook.id;
      deleteBookButton.className = 'deleteBook cell danger';
      deleteBookButton.innerHTML = 'DELETE BOOK';
      newBook.appendChild(deleteBookButton);

      newLibraryContent.appendChild(newBook);
      
    }

    libraryTab.appendChild(newLibraryContent);

  const readStatusButtons = document.querySelectorAll('.changeReadStatus');
  for(let i=0; i<readStatusButtons.length; i++) {
    readStatusButtons[i].addEventListener('click', changeReadStatus);
  }

  const deleteButtons = document.querySelectorAll('.deleteBook');
  for(let i=0; i<deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', deleteBook);
  }
}

const addBookButton = document.createElement('button');
addBookButton.innerHTML = 'ADD A NEW BOOK';
addBookButton.id = 'addBookButton';

libraryTab.appendChild(addBookButton);

addBookButton.addEventListener('click', addBookToLibrary);