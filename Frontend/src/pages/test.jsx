import React, {useState} from 'react'
import Vidu from '../openVidu/Vidu'
export default function Test() {
    const [sessionName, setSessionName] = useState('lobby')
    function sessionChange () {
        if (sessionName == 'lobby') {
            setSessionName('class')
            console.log(sessionName)
        } else {
            setSessionName('lobby')
            console.log(sessionName)
        }
    }
    return (
    <>
        <div>test page</div>
        <button onClick={() => sessionChange()}>change session</button>
        <Vidu sessionName={sessionName}/>
    </>
    )
}
