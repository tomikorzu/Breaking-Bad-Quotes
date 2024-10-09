import $ from "jquery";
import { userAlert } from "./utils/mainFunctions.js";

const addBtn = $("#add");
const deleteBtn = $("#delete");
const deleteAllBtn = $("#delete-all");
const searchInput = $(".input-search");
const searchQuoteShow = $(".search-quote-show");
const quoteBtn = $("#quote-btn");
const quoteText = $("#quote");
const authorText = $("#author");
const favoriteContainer = $(".favorite-container");

let saveQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

const showQuote = (data) => {
  let quote = data[0].quote;
  let author = data[0].author;

  if (!saveQuotes.some(({ quote: savedQuote }) => savedQuote === quote)) {
    quoteText.text(quote);
    authorText.text(author);
  } else {
    fetchData();
  }
};

const fetchData = () => {
  $.getJSON("https://api.breakingbadquotes.xyz/v1/quotes/", (data) => {
    showQuote(data);
  });
};

const deleteQuote = (quoteToDelete) => {
  saveQuotes = saveQuotes.filter(({ quote }) => quote !== quoteToDelete);
  localStorage.setItem("quotes", JSON.stringify(saveQuotes));
  displaySavedQuotes();
};

const displaySavedQuotes = () => {
  searchQuoteShow.empty();
  if (saveQuotes.length === 0) {
    favoriteContainer.hide();
  } else {
    favoriteContainer.show();
    saveQuotes.forEach(({ quote, author }) => {
      searchQuoteShow.append(
        `<div class="quote-show"><h4 class="author">${author}</h4><p>${quote}</p></div>`
      );
    });
  }
};

const runCode = () => {
  fetchData();
  quoteBtn.click(fetchData);
};

addBtn.click(() => {
  const currentQuote = quoteText.text();
  const currentAuthor = authorText.text();
  if (currentQuote) {
    const quoteObject = { quote: currentQuote, author: currentAuthor };
    if (!saveQuotes.some(({ quote }) => quote === currentQuote)) {
      saveQuotes.push(quoteObject);
      localStorage.setItem("quotes", JSON.stringify(saveQuotes));
      displaySavedQuotes();
    } else {
      userAlert("Alert", "This Quote is already in your favorite list");
    }
  }
});

deleteBtn.click(() => {
  const currentQuote = quoteText.text();
  if (currentQuote) {
    deleteQuote(currentQuote);
    if (saveQuotes.length === 0) {
      favoriteContainer.hide();
    }
  }
});

deleteAllBtn.click(() => {
  localStorage.removeItem("quotes");
  saveQuotes = [];
  searchQuoteShow.empty();
  favoriteContainer.hide();
});

searchInput.on("input", function () {
  const searchTerm = searchInput.val().toLowerCase();
  searchQuoteShow.empty();
  saveQuotes.forEach(({ quote, author }) => {
    if (quote.toLowerCase().includes(searchTerm)) {
      searchQuoteShow.append(
        `<div class="quote"><h4 class="author">${author}</h4><p>${quote}</p></div>`
      );
    }
  });
  if (searchQuoteShow.children().length === 0) {
    favoriteContainer.hide();
  } else {
    favoriteContainer.show();
  }
});

displaySavedQuotes();

$(document).ready(runCode);
