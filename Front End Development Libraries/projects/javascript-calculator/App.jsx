import React, { useState } from "react";

const App = () => {
    const [displayValue, setDisplayValue] = useState(0);
    
    return (
        <div>
            <Display displayValue={displayValue} />
            <BtnPad displayValue={displayValue} setDisplayValue={setDisplayValue} />
        </div>
    )
}

const Display = (displayValue) => {

    return (
        <div>
            {displayValue}
        </div>
    )
}

const BtnPad = (displayValue, setDisplayValue) => {

    const handleClick = (btnValue) => {
        
    }

    return (
        <div>
            <button id='AC' className='btn btn-primary col-6 p-2' onClick={handleClick()} type='button'>
                AC
            </button>
            <button id='slash' className='btn btn-primary col-3 p-2' onClick={handleClick()} type='button'>
                /
            </button>
            <button id='multiply' className='btn btn-primary col-3 p-2' onClick={handleClick()} type='button'>
                x
            </button>
            <button id='7' className='btn btn-primary col-3 p-2' onClick={handleClick()} type='button'>
                7
            </button>
            <button id='8' className='btn btn-primary col-3 p-2' onClick={handleClick()} type='button'>
                8
            </button>
            <button id='9' className='btn btn-primary col-3 p-2' onClick={handleClick()} type='button'>
                9
            </button>
            <button id='minus' className='btn btn-primary col-3 p-2' onClick={handleClick()} type='button'>
                -
            </button>
            <button id='4' className='btn btn-primary col-3 p-2' onClick={handleClick()} type='button'>
                4
            </button>
            <button id='5' className='btn btn-primary col-3 p-2' onClick={handleClick()} type='button'>
                5
            </button>
            <button id='6' className='btn btn-primary col-3 p-2' onClick={handleClick()} type='button'>
                6
            </button>
            <button id='addition' className='btn btn-primary col-3 p-2' onClick={handleClick()} type='button'>
                +
            </button>
            <button id='1' className='btn btn-primary col-3 p-2' onClick={handleClick()} type='button'>
                1
            </button>
            <button id='2' className='btn btn-primary col-3 p-2' onClick={handleClick()} type='button'>
                2
            </button>
            <button id='3' className='btn btn-primary col-3 p-2' onClick={handleClick()} type='button'>
                3
            </button>
            <button id='equals' className='btn btn-primary col-3 row-2 p-2' onClick={handleClick()} type='button'>
                =
            </button>
            <button id='0' className='btn btn-primary col-6 p-2' onClick={handleClick()} type='button'>
                0
            </button>
            <button id='dot' className='btn btn-primary col-3 p-2' onClick={handleClick()} type='button'>
                .
            </button>
        </div>
    )
}

export default App