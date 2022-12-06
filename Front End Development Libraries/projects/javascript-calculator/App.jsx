import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'

const App = () => {
    const [displayValue, setDisplayValue] = useState('0');
    const [equationValue, setEquationValue] = useState([]);

    return (
        <div>
            <div className='container main p-1 bg-primary rounded'>
                <Display equationValue={equationValue} displayValue={displayValue} />
                <BtnPad equationValue={equationValue} setEquationValue={setEquationValue} displayValue={displayValue} setDisplayValue={setDisplayValue} />
            </div>
            <span className='text-center d-block p-1 contact-text'>Javascript Calculator made with React & Bootstrap</span>
            <span className='text-center d-block p-1 contact-text'>Coded and Designed by Sean Cravener</span>
            <span className='text-center d-block p-1 contact-text'>Check me out! <a href='https://github.com/SeanCravener'>Github</a> <a href='https://codepen.io/Beelzeboss92'>Codepen</a> <a href='https://twitter.com/SeansTheCoolest'>Twitter</a></span>
        </div>
    )
}

const Display = ({ equationValue, displayValue }) => {

    return (
        <div className='row text-end p-3' id='display'>
            <div className='col-12 p-1 bg-light rounded-top'>
                <span className='display-text'>{equationValue}</span>
            </div>
            <div className='col-12 p-1 bg-light rounded-bottom'>
                <span className='display-text'>{displayValue}</span>
            </div>
        </div>
    )
}

const BtnPad = ({ equationValue, setEquationValue, displayValue, setDisplayValue }) => {

    const handleClear = () => {
        setEquationValue([])
        setDisplayValue('0')
        return
    }

    const handleNumber = (btnValue) => {
 
        // Checks if number is going to be negative 
        if (displayValue === '-' && isOperator(equationValue[equationValue.length - 1])) {
            setDisplayValue(displayValue + btnValue)
            return
        }

        if (isOperator(displayValue)) {
            if (btnValue === '0') {
                return;
            }
            setEquationValue([...equationValue, displayValue])
            console.log('reset')
            setDisplayValue(btnValue)
            return
        }

        if (displayValue === '0') {
            setDisplayValue(btnValue)
            return;
        }

        if (btnValue === '.' && displayValue.includes('.')) {
            return;
        }

        setDisplayValue(displayValue + btnValue)
        return

    }

    const handleOperator = (btnValue) => {

        // if statement checking for consecutive operator input
        if (isOperator(displayValue)) {

            if (isOperator(equationValue[equationValue.length - 1])) {
                const itemRemove = [...equationValue]
                itemRemove.pop()
                setDisplayValue(btnValue)
                setEquationValue([...itemRemove])
                return
            }

            // Negative operator input indicates following number input will be negative 
            // If true, adds last input to equationValue Array and current input to the display
            if (btnValue === '-') {
                setEquationValue([...equationValue, displayValue])
                setDisplayValue(btnValue)
                return
            }

            setDisplayValue(btnValue)
            return

        } else {
            setEquationValue([...equationValue, displayValue])
            setDisplayValue(btnValue)
            return
        }
    }

    const handleEquals = (equation) => {

        if (!isOperator(displayValue) && displayValue !== '0' && displayValue !== '.') {
            setEquationValue([...equationValue, displayValue])
            equation.push(displayValue)
        }

        if (equation.length < 3) {
            return
        } else {
            console.log(equation)
            const answer = calculate(equation)
            setDisplayValue(answer)
            setEquationValue([])
        }
    }

    const calculate = (equation) => {
        let i = 0

        const isInArray = (opOne, opTwo) => {
            if (equation.indexOf(opOne) === -1 && equation.indexOf(opTwo) === -1) {
                return false
            } else {
                return true
            }
        }

        // Loops through array until no more multiplication/division operators are found
        while (isInArray('x', '/')) {
            let item = equation[i]
            console.log(equation)

            switch (item) {
                case 'x':
                    equation.splice((i - 1), 3, (equation[i - 1] * equation[i + 1]))
                    console.log(equation)
                    break;
                case '/':
                    equation.splice((i - 1), 3, (equation[i - 1] / equation[i + 1]))
                    console.log(equation)
                    break;
                default:
                    i++
                    break;
            }

        }

        // Loops through array until no more multiplication/division operators are found
        i = 0;
        while (isInArray('+', '-')) {
            let item = equation[i]
            console.log(equation)

            switch (item) {
                case '+':
                    equation.splice((i - 1), 3, (new Number(equation[i - 1]) + new Number(equation[i + 1])))
                    console.log(equation)
                    break;
                case '-':
                    equation.splice((i - 1), 3, (equation[i - 1] - equation[i + 1]))
                    console.log(equation)
                    break;
                default:
                    i++
                    break;
            }

        }

        return equation[0]
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

    return (
        <div className='p-1'>
            <div className='row g-0'>
                <div className='d-grid col-6 p-1'>
                    <button id='clear' className='btn btn-primary p-2' onClick={() => handleClear()} type='button'>
                        AC
                    </button>
                </div>
                <div className='d-grid col-3 p-1'>
                    <button id='divide' className='btn btn-primary p-2' onClick={() => handleOperator('/')} type='button'>
                        /
                    </button>
                </div>
                <div className='d-grid col-3 p-1'>
                    <button id='multiply' className='btn btn-primary p-2' onClick={() => handleOperator('x')} type='button'>
                        x
                    </button>
                </div>
            </div>
            <div className='row g-0'>
                <div className='d-grid col-3 p-1'>
                    <button id='seven' className='btn btn-primary p-2' onClick={() => handleNumber('7')} type='button'>
                        7
                    </button>
                </div>
                <div className='d-grid col-3 p-1'>
                    <button id='eight' className='btn btn-primary p-2' onClick={() => handleNumber('8')} type='button'>
                        8
                    </button>
                </div>
                <div className='d-grid col-3 p-1'>
                    <button id='nine' className='btn btn-primary p-2' onClick={() => handleNumber('9')} type='button'>
                        9
                    </button>
                </div>
                <div className='d-grid col-3 p-1'>
                    <button id='subtract' className='btn btn-primary p-2' onClick={() => handleOperator('-')} type='button'>
                        -
                    </button>
                </div>
            </div>
            <div className='row g-0'>
                <div className='d-grid col-3 p-1'>
                    <button id='four' className='btn btn-primary p-2' onClick={() => handleNumber('4')} type='button'>
                        4
                    </button>
                </div>
                <div className='d-grid col-3 p-1'>
                    <button id='five' className='btn btn-primary p-2' onClick={() => handleNumber('5')} type='button'>
                        5
                    </button>
                </div>
                <div className='d-grid col-3 p-1'>
                    <button id='six' className='btn btn-primary p-2' onClick={() => handleNumber('6')} type='button'>
                        6
                    </button>
                </div>
                <div className='d-grid col-3 p-1'>
                    <button id='add' className='btn btn-primary p-2' onClick={() => handleOperator('+')} type='button'>
                        +
                    </button>
                </div>
            </div>
            <div className='row g-0'>
                <div className='col-9'>
                    <div className='row g-0'>
                        <div className='d-grid col-4 p-1'>
                            <button id='one' className='btn btn-primary p-2' onClick={() => handleNumber('1')} type='button'>
                                1
                            </button>
                        </div>
                        <div className='d-grid col-4 p-1'>
                            <button id='two' className='btn btn-primary p-2' onClick={() => handleNumber('2')} type='button'>
                                2
                            </button>
                        </div>
                        <div className='d-grid col-4 p-1'>
                            <button id='three' className='btn btn-primary p-2' onClick={() => handleNumber('3')} type='button'>
                                3
                            </button>
                        </div>
                    </div>
                    <div className='row g-0'>
                        <div className='d-grid col-8 p-1'>
                            <button id='zero' className='btn btn-primary p-2' onClick={() => handleNumber('0')} type='button'>
                                0
                            </button>
                        </div>
                        <div className='d-grid col-4 p-1'>
                            <button id='decimal' className='btn btn-primary p-2' onClick={() => handleNumber('.')} type='button'>
                                .
                            </button>
                        </div>
                    </div>
                </div>
                <div className='d-grid col-3 p-1'>
                    <button id='equals' className='btn btn-primary p-2' onClick={() => handleEquals([...equationValue])} type='button'>
                        =
                    </button>
                </div>
            </div>
        </div>
    )
}


export default App