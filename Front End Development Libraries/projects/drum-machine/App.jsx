import React from 'react';
import './style.css';

const drumSamples = [
    {key: 'Q', label: 'Heater 1', fileURL: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'},
    {key: 'W', label: 'Heater 2', fileURL: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'},
    {key: 'E', label: 'Heater 3', fileURL: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'},
    {key: 'A', label: 'Heater 4', fileURL: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'},
    {key: 'S', label: 'Clap', fileURL: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'},
    {key: 'D', label: 'Open-HH', fileURL: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'},
    {key: 'Z', label: 'Kick-n-Hat', fileURL: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'},
    {key: 'X', label: 'Kick', fileURL: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'},
    {key: 'C', label: 'Closed-HH', fileURL: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'}
]

// Need to create event listener, maybe custom hook

const App = () => {

    return (
        <div className='App d-flex justify-content-center align-items-center' id='drum-machine'>
            <div className='row'>
                <div className='col-6'>
                    <Controls />
                </div>
                <div className='col-6'>
                    <Drumpads />
                </div>
            </div>
        </div>
    )
}

export default App


const Drumpads = () => {

    return (
        <div className='row'>
            { drumSamples.map(item => {
                return ( <button className='drum-pad btn btn-primary col-4' type='button' id={item.key}>
                    {item.key}
                </button> );
            })}
        </div>
    )
}

const Controls = () => {

    return (
        <div className='row'>
            <div className='col-6'>
                <button className='btn btn-primary'>On</button>
            </div>
            <div className='col-6'>
                <button className='btn btn-primary'>Off</button>
            </div>
        </div>
    )
}

