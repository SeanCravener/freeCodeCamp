import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faArrowDown, faArrowUp, faArrowsRotate, faPause} from '@fortawesome/free-solid-svg-icons'

const INI_BREAK = 5
const INI_SESSION = 25

const App = () => {
    const [breakL, setBreakL] = useState(INI_BREAK)
    const [sessionL, setSessionL] = useState(INI_SESSION)

    const increment = (incrementNum) => {
        incrementNum += 1
        if(incrementNum <= 0 || incrementNum > 60) {
            return
        }
        return incrementNum
    }

    const decrement = (decrementNum) => {
        decrementNum -= 1
        if(decrementNum <= 0 || decrementNum > 60) {
            return
        }
        return decrementNum
    }

    return (
        <div className='container'>
            <div className='row'>
                <span className='fs-2'>
                    25 + 5 Clock
                </span>
            </div>
            <div className='row'>
                <div className='col-6'>
                    <div className='row'>
                        <div className='col-12 fs-3' id='break-label'>
                            Break Length
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-4' id='break-decrement'>
                            <button onClick={() => setBreakL(decrement(breakL))} type='button'>
                            <FontAwesomeIcon icon={faArrowDown} />
                            </button>
                        </div>
                        <div className='col-4' id='break-length'>
                            {breakL}
                        </div>
                        <div className='col-4' id='break-increment'>
                        <button onClick={() => setBreakL(increment(breakL))} type='button'>
                            <FontAwesomeIcon icon={faArrowUp} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className='col-6'>
                    <span id='session-label' className='fs-3'>
                        Session Length
                    </span>
                    <div className='row'>
                        <div className='col-4' id='session-decrement'>
                        <button className='btn btn-primary' onClick={() => setSessionL(decrement(sessionL))} type='button'>

                            <FontAwesomeIcon icon={faArrowDown} />
                            </button>
                        </div>
                        <div className='col-4' id='session-length'>
                            {sessionL}
                        </div>
                        <div className='col-4' id='session-increment'>
                        <button onClick={() => setSessionL(increment(sessionL))} type='button'>
                            <FontAwesomeIcon icon={faArrowUp} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Timer breakTimer={breakL} sessionTimer={sessionL} />
        </div>
    )
}

const Timer = ({breakTimer, sessionTimer}) => {
    // const [paused, setPaused] = useState(true);

    // useEffect(() => {
    //     let timerId;
    //     if (!paused) {
    //       timerId = setInterval(() => {
    //         setDuration((prev) => prev - 1);
    //       }, 1000);
    //       console.log(timerId);
    //     }
    
    //     return function cleanup() {
    //       console.log(`Clearing ${timerId}`);
    //       clearInterval(timerId);
    //     };
    //   }, [paused]);
    
    //   const handleClick = (e) => {
    //     !paused ? setPaused(true) : setPaused(false);
    //   };


    return (
        <div className='row'>
            <div className='col-12'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='row'>
                            <div className='col-12' id='timer-label'>
                                {breakTimer}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12' id='time-left'>
                                {sessionTimer}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4' id='start_stop'>
                        <FontAwesomeIcon icon={faPlay} />
                    </div>
                    <div className='col-4' id='start_stop'>
                        <FontAwesomeIcon icon={faPause} />
                    </div>
                    <div className='col-4' id='reset'>
                        <FontAwesomeIcon icon={faArrowsRotate} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App

