import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faArrowDown, faArrowUp, faArrowsRotate, faPause} from '@fortawesome/free-solid-svg-icons'

const INI_BREAK = 1
const INI_SESSION = 1

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
    const [duration, setDuration] = useState(sessionTimer * 60)
    const [label, setLabel] = useState('Work')
    const [playing, setPlaying] = useState(false)

    const onFinish = () => {
        if (label === 'Work') {
            setLabel('Break')
            setDuration(breakTimer * 60)
        } else {
            setLabel('Work')
            setDuration(sessionTimer * 60)
        }
    }
    
    useEffect(() => {
        // Return early if we reach 0
        if(duration === 0 ) return;

        if(playing) {
        const timerId = setInterval(() => {
            setDuration(duration - 1);
        }, 1000);
        

        return () => clearInterval(timerId)
    } else {
            return;
        }
    }, [duration, playing]);

    useEffect(() => {
        if (duration === 0) {
            onFinish()
        }
    }, [duration, onFinish]);

    const reset = () => {
        setDuration(sessionTimer * 60)
        setLabel('Work')
        setPlaying(false)
    }

    const minutesLeft = Math.floor(duration / 60)
    const secondsLeft = duration % 60

    return (
        <div className='row'>
            <div className='col-12'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='row'>
                            <div className='col-12' id='timer-label'>
                                {label}
                            </div>
                            <div className='col-12' id='time-left'>
                                {minutesLeft}:{secondsLeft}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4' id='start_stop'>
                        <FontAwesomeIcon icon={faPlay} onClick={() => setPlaying(true)}/>
                    </div>
                    <div className='col-4' id='start_stop'>
                        <FontAwesomeIcon icon={faPause} onClick={() => setPlaying(false)}/>
                    </div>
                    <div className='col-4' id='reset'>
                        <FontAwesomeIcon icon={faArrowsRotate} onClick={() => reset()}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App

