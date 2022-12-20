import React from "react";
import "./style.css";

const App = () => {
  const [quote, setQuote] = React.useState(null);
  const API_URL = "https://api.quotable.io/random";

  // Function that retrieves random quote from URL and sets quote content if successful.
  const quoteUpdate = async () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setQuote(data);
      })
      .catch((error) => console.log(error));
  };

  React.useEffect(() => {
    quoteUpdate();
  }, []);

  // Will not render until the first quote is finished loading.
  if (!quote) return null;

  return (
    <div className="App" id="quote-box">
      <div id="top">
        <div id="text">{quote.content}</div>
        <div id="author">- {quote.author}</div>
      </div>
      <div id="bottom">
        <button id="new-quote" onClick={quoteUpdate}>
          New Quote
        </button>
        <a
          id="tweet-quote"
          target="_top"
          href={
            "https://twitter.com/intent/tweet?hashtags=quotes&text=" +
            encodeURIComponent('"' + quote.content + '" ' + quote.author)
          }
        >
          <img
            src="/square-twitter.svg"
            className="twitter"
            alt="Tweet This!"
          />
        </a>
      </div>
    </div>
  );
};

export default App;
