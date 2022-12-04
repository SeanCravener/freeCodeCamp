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
            // setEquationValue([...equationValue, btnValue])
            // setDisplayValue(btnValue)
            // Above is original to test with

            // Below is a first draft attempt to handle input correctly so it can be fed to calculate() in a simply way
            if (equationValue.length === 0) {
                
                // The if statement below makes sure the beginning of the formula does not contain leading zeros or any operaters except for a minus
                if (isOperator(btnValue) && !isNegative(btnValue) && btnValue != 0) {
                    return; //make sure this doesn't just break from current if statement, but the whole thing
                } else {
                    setEquationValue([btnValue])
                    return;
                }
            
            } else {

                // Seperates how input is handled depending on if btnvalue is an operater or number/negative/decimal
                if (isOperator(btnValue)) {

                // If statement to check for consecutive operaters in formula.
                // if the last item is an operater, the btnValue replaces the last item in equationValue
                // Checks if last item added to equationValue is an operater.
                    if (isOperator(equationValue[equationValue.length - 1])){
                        
                        // Minus/Negative need to be handled by if statement since they are same action
                        if (isNegative(btnValue)){

                            // Thinking double minues/negatives might cause a third to throw an error or something.
                            // the if statement below tests for this, hopefully
                            if (isNegative(equationValue[equationValue.length - 2])) {
                                return;
                            } else {
                                setEquationValue([...equationValue, btnValue]);
                                return;
                            }

                        } else {

                            // NEEDS TESTED. If the last item and current item are both operaters.
                            // this statement below should take off the last itme/operater
                            // and replace it with new operater/btnValue
                            // Look into easier way to replace items in array
                            let tempEq = [...equationValue]
                            tempEq.splice((tempEq.length - 1), 1)
                            setEquationValue([...tempEq, btnValue])
                            return;
                        }
                    } else {
                        setEquationValue([...equationValue, btnValue])
                    }
                
                } else {

                    
                }

            }
        }
    
    }

    const handleEquals = () => {
        // deal with the equal sign calculation seperatly than handleClick
        // trim end if it has an operator to calculate smoother?
        const answer = 0;

        if(equationValue.length < 1) {
            answer = calculate(equationValue)
            setDisplayValue(answer)
        } else {

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

const calculate = (equationValue) => {
    // Maybe start by looping through expression array looking for multiply or divide, 
    // if found, replace first numerator with calculation and remove operator along with second numerator
    // After first loop, take the same array and do another loop looking for addition or subtraction,
    // if found, replace first numerator with calculation and remove operator along with second numerator

    // Need a isOperator check for more than one in a row, maybe a isNegative too, 
    
}

const isOperator = (operator) => {
    switch (operator) {
        case '/': 
            return true;
        case 'x':
            return true;
        case '+':
            return true;
        case '-':
            return true;
        default:
            return false;
    }
}

const isNegative = (negative) => {
    if (negative === '-') {
        return true;
    } else {
        return false;
    }
}

const isDecimal = (decimal) => {
    if (decimal === '.') {
        return true;
    } else {
        return false;
    }
}
export default App