import React from 'react';
import { inject, observer } from 'mobx-react';
import Messenger from './chatUI/src/components/Messenger';


const Chat = inject('tasksStore', 'user','chatStore')(observer((props) => {

    return (
       <div>
           <Messenger />
       </div>
    )
}))
        
export default Chat;

