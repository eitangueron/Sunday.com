import React, { useState} from 'react';
import './Compose.css';

export default function Compose(props) {

  const [input, setInput] = useState('')

  const sendInput = props.sendInput

  const sendMessage = (e) => {
    sendInput(e,input)
    setInput('')
  }

    return (
      <div className="compose">
        <input type="text" className="compose-input" placeholder="Type a message, @name"
          value={input} onChange={(e)=>setInput(e.target.value)}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              sendMessage(e)
            }}}/>
        <button onClick={(e)=>sendMessage(e)} 
        style={{ height: '40px', width: '80px', borderRadius: '7%', backgroundColor: '#4051b5',
        color: 'white', fontWeight: 'bold', cursor: 'pointer', border: 'white'}} 
        >Send</button>
        {/* {
          props.rightItems
        } */}
      </div>
    );
}

