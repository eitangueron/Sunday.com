import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import Axios from 'axios';
import '../styles/login.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
//import { AlertError } from 'material-ui/svg-icons';
//import details from 'material-ui/svg-icons/image/details';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

// const API_URL = 'http://localhost:3200'
const API_URL = ''

const Login = inject('tasksStore', 'user')(observer((props) => {

    const [userNameInput, setUserNameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [openSnackbar2, setOpenSnackbar2] = useState(false)

    const logIn = async () => {
        const loginData = {
            name: userNameInput,
            password: passwordInput
        }
        if(!(userNameInput && passwordInput)){
            setOpenSnackbar2(true)
            return
        }
        Axios.post(`${API_URL}/login`,loginData).then( async res => {
            console.log(res.data.status )
            if(res.data.status === 'OK'){

                const userID = res.data.userId
                const response = await Axios.get(`${API_URL}/user/${userID}`)
                props.user.logout()
                props.user.login(response.data, userID)

                await props.tasksStore.getTasksFromDB(userID) // does not seem to be vital

                console.log(response);
                let details = response.data 
                localStorage.setItem('firstName', `${details.firstName}`);
                localStorage.setItem('lastName', `${details.lastName}`);
                localStorage.setItem('email', `${details.email}`);               

            } else {
                setOpenSnackbar(true)
            }
        })
    }
    
    return (
        <div id="login-page-container">
            <div id="login-page">

                <TextField id="userName-input" label="User Name" type="text"
                    autoComplete="current-password" variant="outlined"
                    style={{ marginTop: '5%' }}
                    value={userNameInput} onChange={(e) => setUserNameInput(e.target.value)} /> <br />

                <TextField id="password-input" label="Password" type="password"
                    autoComplete="current-password" variant="outlined"
                    style={{ marginTop: '5%' }}
                    value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} /> <br />

                <Button variant="contained" color="primary" onClick={logIn}> Log In </Button> <br />
                <Link to="/signUp">
                    <Button variant="contained" color="primary"> Create New Account </Button>
                </Link>

                <Snackbar open={openSnackbar} autoHideDuration={5000} 
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                    <Alert onClose={()=>setOpenSnackbar(false)} severity="error" variant="filled">
                        <span style={{display:'block'}}> {'Incorrect Password!'} </span>
                        <span> {'Please Try again'} </span>
                    </Alert>
                </Snackbar>               

                <Snackbar open={openSnackbar2} autoHideDuration={5000} 
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                    <Alert onClose={()=>setOpenSnackbar2(false)} severity="error" variant="filled">
                        <span style={{display:'block'}}>Please fill all input fields</span>
                    </Alert>
                </Snackbar> 

            </div>
        </div>
    );
}))

export default Login;
