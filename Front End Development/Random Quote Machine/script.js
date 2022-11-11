import React from 'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js';
import ReactDOM from 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js';

const App = () => {
    const [quote, setQuote] = React.useState(null);
    const API_URL = 'https://api.quotable.io/random';

    // Function that retrieves random quote from URL and sets quote content if successful.
    const quoteUpdate = async () => {
        fetch(API_URL)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setQuote(data);
            })
            .catch((error) => console.log(error))
    }

    React.useEffect(() => {
        quoteUpdate();
    }, []);

    // Will not render until the first quote is finished loading.
    if(!quote) return null;

    return (
        <div className='App' id='quote-box'>
            <div id='top'>
            <div id='text'>
                {quote.content}
            </div>
            <div id='author'>
                - {quote.author}
            </div>
        </div>
        <div id='bottom'>
            <button id='new-quote' onClick={quoteUpdate}>
                New Quote
            </button>
            <a id='tweet-quote' target='_top' href={'https://twitter.com/intent/tweet?hashtags=quotes&text=' + 
                encodeURIComponent('"' + quote.content + '" ' + quote.author)
                }>
                <i className='fa-brands fa-square-twitter'></i>
            </a>
        </div>
        </div>
    )

}

ReactDOM.render(<App />, document.getElementById('root'))
