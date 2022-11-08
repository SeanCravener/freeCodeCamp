import React, { useState } from "react";

export default function App() {
    const [quote, setQuote] = React.useState(null);
    const API_URL = 'https://api.quotable.io/random';
    const ERROR_MSG = 'Error retrieving data'

    // Function that retrieves random quote from URL and sets quote content if successful.
    async function quoteUpdate() {
        try {
            const response = await fetch(API_URL);
            const { code, message, ...quote } = await response.json();
            if (!response.ok) throw new Error('${code} ${message}');
            setQuote(quote);
        } catch (error) {
            // Catch error, display on console and UI.
            console.error(error);
            setQuote({ content: ERROR_MSG });
        }
    }

    React.useEffect(() => {
        quoteUpdate();
    }, []);

    // Will not render until the first quote is finished loading.
    if(!quote) return null;

    return (
        <div className='App' id='quote-box'>
            <div id='text'>
                {quote.content}
            </div>
            <div id='author'>
                - {quote.author}
            </div>
            <button id='new-quote' onClick={quoteUpdate}>
                New Quote
            </button>
            <i class='fa-brands fa-square-twitter'></i>
        </div>
    )

}

ReactDOM.render(<App />, document.getElementById('root'))

