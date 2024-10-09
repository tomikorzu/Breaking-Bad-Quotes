import $ from "jquery";

const saveQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

const showQuote = (data) => {
  let quote = data[0].quote;
  let author = data[0].author;

  if (!saveQuotes.includes(quote)) {
    saveQuotes.push(quote);
    localStorage.setItem("quotes", JSON.stringify(saveQuotes));
  }

  $("#quote").text(quote);
  $("#author").text(author);
};

const fetchData = () => {
  $.getJSON("https://api.breakingbadquotes.xyz/v1/quotes/", (data) => {
    showQuote(data);
  });
};

const deleteQuote = (quote) => {
  saveQuotes = saveQuotes.filter((item) => item !== quote);
  localStorage.setItem("quotes", JSON.stringify(saveQuotes));
};

const runCode = () => {
  fetchData();
  $("#quote-btn").click(fetchData);
};

$(document).ready(runCode);
