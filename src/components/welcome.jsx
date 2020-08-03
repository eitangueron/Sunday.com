import React
// , { useState, useEffect } 
from 'react';
import '../styles/welcomePage.css'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
// import { observer, inject } from 'mobx-react';
// import Axios from 'axios';

// const API_URL = 'http://localhost:3200'
// const API_URL = ''

const Welcome = (props) => {
    
    const getDateNow = ()=> {
        const today = new Date();
        const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const monthsOfTheYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const day = daysOfTheWeek[today.getDay()]
        const month = monthsOfTheYear[today.getMonth()]
        const dd = today.getDate()
        // const dd = String(today.getDate()).padStart(2, '0');
        // eslint-disable-next-line
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        const fullDate = `${day}, ${dd} of ${month}, ${yyyy}`
        // day + ', ' + mm + month +  mm + '/' + dd + '/' + yyyy;
        return fullDate
    }

    let userName = localStorage['firstName'] +  ' ' +localStorage['lastName']

    return (
       <div id="welcome-container">
           <h1>{'Welcome ' + userName + ','}</h1>
           <h2>{getDateNow()}</h2>
           <h2>"Work hard, Play hard"</h2>
           <p>Elon Musk</p>
           <Link to="/tasks">
                <Button variant="contained" color="primary"> My tasks </Button> 
           </Link>
           <Link to="/teams">
                <Button variant="contained" color="primary"> Team tasks </Button> 
           </Link>

       </div>
    )
}
        
export default Welcome;
