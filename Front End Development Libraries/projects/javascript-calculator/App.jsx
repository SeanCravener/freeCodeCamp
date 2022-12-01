import React, { useState } from "react";


const App = () => {
    const [displayValue, setDisplayValue] = useState('Hello');
    const [equationValue, setEquationValue] = useState([]);

    return (
        <div className='row'>
            <Display equationValue={equationValue} displayValue={displayValue} />
            <BtnPad equationValue={equationValue} setEquationValue={setEquationValue} setDisplayValue={setDisplayValue} />
        </div>
    )
}

const Display = ({ equationValue, displayValue }) => {

    return (
        <div className='row gap-1' id='display'>
            <div className='row'>
                {equationValue}
            </div>
            <div className='row'>
                {displayValue}
            </div>
        </div>
    )
}

const BtnPad = ({ equationValue, setEquationValue, setDisplayValue }) => {

    const handleClick = (btnValue) => {
        if(btnValue === 'clear') {
            setEquationValue([])
            setDisplayValue(0)
        } else {
            setEquationValue([...equationValue, btnValue])
            setDisplayValue(btnValue)
        }
    }

    return (
        <div className='row'>
            <div className='row g-0'>
                <div className='d-grid col-6 p-1'>
                    <button id='clear' className='btn btn-primary p-2' onClick={() => handleClick('clear')} type='button'>
                        AC
                    </button>
                </div>
                <div className='d-grid col-3 p-1'>
                    <button id='divide' className='btn btn-primary p-2' onClick={() => handleClick('/')} type='button'>
                        /
                    </button>
                </div>
                <div className='d-grid col-3 p-1'>
                    <button id='multiply' className='btn btn-primary p-2' onClick={() => handleClick('x')} type='button'>
                        x
                    </button>
                </div>
            </div>
            <div className='row g-0'>
                <div className='d-grid col-3 p-1'>
                    <button id='seven' className='btn btn-primary p-2' onClick={() => handleClick('7')} type='button'>
                        7
                    </button>
                </div>
                <div className='d-grid col-3 p-1'>
                    <button id='eight' className='btn btn-primary p-2' onClick={() => handleClick('8')} type='button'>
                        8
                    </button>
                </div>
                <div className='d-grid col-3 p-1'>
                    <button id='nine' className='btn btn-primary p-2' onClick={() => handleClick('9')} type='button'>
                        9
                    </button>
                </div>
                <div className='d-grid col-3 p-1'>
                    <button id='subtract' className='btn btn-primary p-2' onClick={() => handleClick('-')} type='button'>
                        -
                    </button>
                </div>
            </div>
            <div className='row g-0'>
                <div className='d-grid col-3 p-1'>
                    <button id='four' className='btn btn-primary p-2' onClick={() => handleClick('4')} type='button'>
                        4
                    </button>
                </div>
                <div className='d-grid col-3 p-1'>
                    <button id='five' className='btn btn-primary p-2' onClick={() => handleClick('5')} type='button'>
                        5
                    </button>
                </div>
                <div className='d-grid col-3 p-1'>
                    <button id='six' className='btn btn-primary p-2' onClick={() => handleClick('6')} type='button'>
                        6
                    </button>
                </div>
                <div className='d-grid col-3 p-1'>
                    <button id='add' className='btn btn-primary p-2' onClick={() => handleClick('+')} type='button'>
                        +
                    </button>
                </div>
            </div>
            <div className='row g-0'>
                <div className='col-9'>
                    <div className='row g-0'>
                        <div className='d-grid col-4 p-1'>
                            <button id='one' className='btn btn-primary p-2' onClick={() => handleClick('1')} type='button'>
                                1
                            </button>
                        </div>
                        <div className='d-grid col-4 p-1'>
                            <button id='two' className='btn btn-primary p-2' onClick={() => handleClick('2')} type='button'>
                                2
                            </button>
                        </div>
                        <div className='d-grid col-4 p-1'>
                            <button id='three' className='btn btn-primary p-2' onClick={() => handleClick('3')} type='button'>
                                3
                            </button>
                        </div>
                    </div>
                    <div className='row g-0'>
                        <div className='d-grid col-8 p-1'>
                            <button id='zero' className='btn btn-primary p-2' onClick={() => handleClick('0')} type='button'>
                                0
                            </button>
                        </div>
                        <div className='d-grid col-4 p-1'>
                            <button id='decimal' className='btn btn-primary p-2' onClick={() => handleClick('.')} type='button'>
                                .
                            </button>
                        </div>
                    </div>
                </div>
                <div className='d-grid col-3 p-1'>
                    <button id='equals' className='btn btn-primary p-2' onClick={() => handleClick('Need to finish equal sign')} type='button'>
                        =
                    </button>
                </div>
            </div>
        </div>
    )
}

export default App