/* eslint-disable no-use-before-define */

// define data structures

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

Book.prototype.appendToDOM = function appendToDOM() {
  // create dom elements in memory
  const cardBookContainer = document.createElement('div')
  cardBookContainer.classList.add('library__book-container')
  
  const cardBookTitle = document.createElement('div')
  cardBookTitle.classList.add('library__book-title')

  const cardBookAuthor = document.createElement('div')
  cardBookAuthor.classList.add('library__book-author')

  const cardBookPages = document.createElement('div')
  cardBookPages.classList.add('library__book-pages')

  const cardBookRead = document.createElement('button')
  cardBookRead.classList.add('library__book-read')
  cardBookRead.addEventListener('click', (event) => this.toggleReadStatus(event) )

  const cardBookRemoveBtn = document.createElement('button')
  cardBookRemoveBtn.classList.add('library__book-remove')
  cardBookRemoveBtn.addEventListener('click', (event) => this.removeCardDisplay(event) )
  
  // add text content to elements
  cardBookTitle.textContent = `"${this.title}"`
  cardBookAuthor.textContent = `by ${this.author}`
  cardBookPages.textContent = `${this.pages} pages`
 
  if (this.read === true) {
    cardBookRead.textContent = 'Read ✅'
    cardBookRead.style.backgroundColor = '#8fff82'

  } else if (this.read === false) {
    cardBookRead.textContent = 'Not Read 📕'
    cardBookRead.style.backgroundColor = '#ff8282'

  }
  cardBookRemoveBtn.textContent = 'Remove'

  
  // append elements to dom
  libraryDisplay.appendChild(cardBookContainer)
  cardBookContainer.appendChild(cardBookTitle)
  cardBookContainer.appendChild(cardBookAuthor)
  cardBookContainer.appendChild(cardBookPages)
  cardBookContainer.appendChild(cardBookRead)
  cardBookContainer.appendChild(cardBookRemoveBtn)  
}

Book.prototype.removeCardDisplay = function removeCardDisplay(event) {
  console.log(`remove btn clicked for ${event.target.parentNode.classList} and book title is ${this.title}`)
  for (let i = 0; i < myLibrary.length; i+=1) {
    if (myLibrary[i].title === this.title) {
      myLibrary.splice(i,1);
    }
  }
  clearDisplay()
  updateDisplay()
}

Book.prototype.toggleReadStatus = function toggleReadStatus(event) {
  console.log(`readtoggle btn clicked for ${event.target.parentNode.classList} and book title is ${this.title}`)
  for (let i = 0; i < myLibrary.length; i+=1) {
    if (myLibrary[i].title === this.title && this.read === true) {
      myLibrary[i].read = false
    } else if (myLibrary[i].title === this.title && this.read === false) {
      myLibrary[i].read = true
    }
  }
  clearDisplay()
  updateDisplay()
}

const myLibrary = [
  (new Book('Cracking the Coding Interview','Gayle Laakmann McDowell', 687, false)),
  (new Book('Eloquent JavaScript: A Modern Introduction to Programming','Marijn Haverbeke', 224, false)),
  (new Book('Beginning Programming For Dummies','Wallace Wang', 408, true)),
];

// define dom elements

const formOverall = document.querySelector('.form')
formOverall.addEventListener('submit', (event) => addBookToLibrary(event)) 
const formBookTitle = document.querySelector('#form__title-input')
const formBookAuthor = document.querySelector('#form__author-input')
const formBookPages = document.querySelector('#form__pages-input')
const formBookRead = document.querySelector('#form__read-input')
const formToggle = document.querySelector('.overlay-add-btn')
formToggle.addEventListener('click', () => showOverlay()) 

const formOverlay = document.querySelector('.form')
const maskOverlay = document.querySelector('#page-mask')
maskOverlay.addEventListener('click', () => hideOverlay())

const libraryDisplay = document.querySelector('.library')

// define functions

function newBook () {
  const title = formBookTitle.value
  const author = formBookAuthor.value
  const pages = formBookPages.value
  const read = formBookRead.checked
  
  return new Book (title,author,pages,read)
}

function clearForm () {
  formBookTitle.value = ''
  formBookAuthor.value = ''
  formBookPages.value = '' 
  formBookRead.checked = false
}

function showOverlay () {
  formOverlay.classList.add('active')
  maskOverlay.classList.add('active')
}

function hideOverlay () {
  formOverlay.classList.remove('active')
  maskOverlay.classList.remove('active')
  clearForm()
}

function clearDisplay () {
  while (libraryDisplay.firstChild) {
      libraryDisplay.removeChild(libraryDisplay.firstChild);
  }
}

function updateDisplay () {
  for (let i = 0; i < myLibrary.length; i++) {
    myLibrary[i].appendToDOM()
  }
}

function addBookToLibrary (event) {
  event.preventDefault()
  myLibrary.push(newBook())
  clearForm()
  hideOverlay()
  clearDisplay()
  updateDisplay()
}

updateDisplay()