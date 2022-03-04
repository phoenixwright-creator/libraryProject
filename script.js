class Book {
  constructor(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info(){
    return 'NAME : ' + this.title + ' | AUTHOR : ' + this.author + ' | NUMBER OF PAGES : ' + this.pages + ' | READ : ' + this.read;
  }
}

class Library {
  
  static showForm(){
    const activateFormOverlay = document.getElementById('overlay');
    activateFormOverlay.style.display = 'block';
    const title = document.getElementById('formBookName');
    const author = document.getElementById('formBookAuthor');
    const pages = document.getElementById('formPagesNumber');
    const read = document.getElementById('formRead');
    title.value = "";
    author.value = "";
    pages.value = null;
    read.checked = true;
  }

  static displayLibrary(library){
    const oldLibraryContent = document.getElementById('libraryContent');
    if(oldLibraryContent === null){
      const newLibraryContent = document.createElement('div');
      newLibraryContent.id = 'libraryContent';
    }
    else if(oldLibraryContent !== null){
      libraryTab.removeChild(oldLibraryContent);
      const newLibraryContent = document.createElement('div');
      newLibraryContent.id = 'libraryContent';
      if(library.length !== 0){
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
      }
      
      libraryTab.appendChild(newLibraryContent);
  
      const readStatusButtons = document.querySelectorAll('.changeReadStatus');
      for(let i=0; i<readStatusButtons.length; i++) {
        readStatusButtons[i].addEventListener('click', Library.changeReadStatus);
      }
    
      const deleteButtons = document.querySelectorAll('.deleteBook');
      for(let i=0; i<deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', Library.deleteBook);
      }
    }
  }

  static changeReadStatus(event){
    if(myLibrary[(event.target.id - 1)].read === 'YES') {
      myLibrary[(event.target.id - 1)].read = 'NO';
    }
    else if(myLibrary[(event.target.id - 1)].read === 'NO') {
      myLibrary[(event.target.id - 1)].read = 'YES';
    }
    Library.displayLibrary(myLibrary);
  }

  static deleteBook(event){
    myLibrary.splice((event.target.id - 1), 1);
    Library.displayLibrary(myLibrary);
  }

  static addBook(){
    const activateFormOverlay = document.getElementById('overlay');
    const title = document.getElementById('formBookName').value.toUpperCase();
    const author = document.getElementById('formBookAuthor').value.toUpperCase();
    const pages = document.getElementById('formPagesNumber').value;
    const read = document.getElementById('formRead');
  
    if (pages <= 0) {
      alert ("A book with no pages doesn't even exist !");
      return;
    }
    else if (title !== "" && author !== "" && pages !== null && pages > 0 && read.checked === true) {
      let book = new Book(title, author, pages, 'YES');
      myLibrary.push(book);
    }
    else if (title !== "" && author !== "" && pages !== null && pages > 0 && read.checked === false) {
      let book = new Book(title, author, pages, 'NO');
      myLibrary.push(book);
    }
    activateFormOverlay.style.display = 'none';
    Library.displayLibrary(myLibrary);
  }

  static cancelForm(){
    const activateFormOverlay = document.getElementById('overlay');
    activateFormOverlay.style.display = 'none';
  }
}

let myLibrary = [];

const libraryTab = document.getElementById('libraryTab');

const addBookButton = document.createElement('button');
addBookButton.innerHTML = 'ADD A NEW BOOK';
addBookButton.id = 'addBookButton';
libraryTab.appendChild(addBookButton);
addBookButton.addEventListener('click', Library.showForm);

const libraryContent = document.createElement('div');
libraryContent.id = 'libraryContent';
libraryTab.appendChild(libraryContent);

const addBookFormButton = document.getElementById('addBook');
addBookFormButton.addEventListener('click', Library.addBook);

const cancelFormButton = document.getElementById('cancel');
cancelFormButton.addEventListener('click', Library.cancelForm);