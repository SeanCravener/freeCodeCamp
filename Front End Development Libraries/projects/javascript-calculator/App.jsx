import React, { useState } from "react";


const App = () => {
    const [displayValue, setDisplayValue] = useState('Hello');
    const [equationValue, setEquationValue] = useState(['1', '+', '2']);

    return (
        <div className='row'>
            <Display equationValue={equationValue} displayValue={displayValue} />
            <BtnPad equationValue={equationValue} setEquationValue={setEquationValue} setDisplayValue={setDisplayValue} />
        </div>
    )
}

const Display = ({ equationValue, displayValue }) => {

    return (
        <div className='row gap-1'>
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
            setDisplayValue('You reset this bitch')
        } else {
            setEquationValue([...equationValue, btnValue])
            setDisplayValue(btnValue)
        }
    }

    return (
        <div className='row'>
            <div className='row g-0'>
                <div className='d-grid col-6 p-1'>
                    <button id='AC' className='btn btn-primary p-2' onClick={() => handleClick('clear')} type='button'>
                        AC
                    </button>
                </div>
                <div className='d-grid col-3 p-1'>
                    <button id='slash' className='btn btn-primary p-2' onClick={() => handleClick('/')} type='button'>
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
                    <button id='7' className='btn btn-primary p-2' onClick={() => handleClick('7')} type='button'>
                        7
                    </button>
                </div>
                <div className='d-grid col-3 p-1'>
                    <button id='8' className='btn btn-primary p-2' onClick={() => handleClick('8')} type='button'>
                        8
                    </button>
                </div>
                <div className='d-grid col-3 p-1'>
                    <button id='9' className='btn btn-primary p-2' onClick={() => handleClick('9')} type='button'>
                        9
                    </button>
                </div>
                <div className='d-grid col-3 p-1'>
                    <button id='minus' className='btn btn-primary p-2' onClick={() => handleClick('-')} type='button'>
                        -
                    </button>
                </div>
            </div>
            <div className='row g-0'>
                <div className='d-grid col-3 p-1'>
                    <button id='4' className='btn btn-primary p-2' onClick={() => handleClick('4')} type='button'>
                        4
                    </button>
                </div>
                <div className='d-grid col-3 p-1'>
                    <button id='5' className='btn btn-primary p-2' onClick={() => handleClick('5')} type='button'>
                        5
                    </button>
                </div>
                <div className='d-grid col-3 p-1'>
                    <button id='6' className='btn btn-primary p-2' onClick={() => handleClick('6')} type='button'>
                        6
                    </button>
                </div>
                <div className='d-grid col-3 p-1'>
                    <button id='addition' className='btn btn-primary p-2' onClick={() => handleClick('+')} type='button'>
                        +
                    </button>
                </div>
            </div>
            <div className='row g-0'>
                <div className='col-9'>
                    <div className='row g-0'>
                        <div className='d-grid col-4 p-1'>
                            <button id='1' className='btn btn-primary p-2' onClick={() => handleClick('1')} type='button'>
                                1
                            </button>
                        </div>
                        <div className='d-grid col-4 p-1'>
                            <button id='2' className='btn btn-primary p-2' onClick={() => handleClick('2')} type='button'>
                                2
                            </button>
                        </div>
                        <div className='d-grid col-4 p-1'>
                            <button id='3' className='btn btn-primary p-2' onClick={() => handleClick('3')} type='button'>
                                3
                            </button>
                        </div>
                    </div>
                    <div className='row g-0'>
                        <div className='d-grid col-8 p-1'>
                            <button id='0' className='btn btn-primary p-2' onClick={() => handleClick('0')} type='button'>
                                0
                            </button>
                        </div>
                        <div className='d-grid col-4 p-1'>
                            <button id='dot' className='btn btn-primary p-2' onClick={() => handleClick('.')} type='button'>
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