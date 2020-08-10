import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import TeamsByMembers from './team-components/TeamsByMembers';
import TeamsByTasks from './team-components/TeamsByTasks';
import {  Button } from '@material-ui/core';
import { useEffect } from 'react';
// import { Router, Link } from 'react-router-dom';
import '../styles/teams.css'
import {  NativeSelect } from '@material-ui/core';
import axios from 'axios';
import TeamHandler from './team-components/TeamHandler'
import { config } from '../Constants'

const API_URL= config.url.API_URL


const Teams = inject('teamsStore')(observer((props) => {
    const [taskInput, settaskInput] = useState('')
    const [statusInput, setstatusInput] = useState('')
    const [toShow, setToShow] = useState('tasks')

    const [alltasks, setAll] = useState([])
    const statusArr = ['In progress','Completed']


    useEffect(()=>{
        const fetchData = async () => {
            await props.teamsStore.getTeams(localStorage.getItem('userId'))
        }
        fetchData()
        // eslint-disable-next-line
    }, [])

    useEffect(()=>{
        const getTasks = async () => {
            let alltasksFromDB = []
            props.teamsStore.teams.forEach( async tID => {
                try {
                    // let tasks = await axios.get(`${API_URL}/alltasks`); 
                    let tasks = await axios.get(`${API_URL}/teamstasks/${tID.id}`);  
                    alltasksFromDB = [...alltasksFromDB, ...tasks.data]
                    setAll([...alltasks, ...alltasksFromDB])
                } catch (err) {
                    console.log(err);
                }
            })
        }
        getTasks()
    }, [])


    const [manageTeams, setManageTeams] = useState(false)

    const trackTask = async () => {
        const userData = await axios.get(`${API_URL}/user/${localStorage.getItem('userId')}`);
        const email = userData.data.email
        await axios.post(`${API_URL}/tracking`, {
            taskId: taskInput.substr(0, taskInput.indexOf(' ')),
            email: email,
            status: statusInput
        });
        alert("Ok! We Will ...")
    }

    const toggleShow = () => {
        if (toShow === 'tasks') {
            setToShow('members')
        } else {
            setToShow('tasks')
        }
    }

    const [showAut, setShowAut] = useState(false)
    
    const toggleTeamManager = (tab) => {
        if(tab === 'automation'){
            setShowAut(!showAut)
            setManageTeams(false)
        } else if(tab === 'manage-teams'){
            setShowAut(false)
            setManageTeams(!manageTeams)
        }
    }

    return (
        <div id="tasks-page">

            <div id="buttons">
            <div id="controling-buttons">

            <Button variant='contained' color='primary' onClick={()=>toggleTeamManager('automation')}
             style={{ width: 'fit-content', marginRight:'2%' }}> Add Automation </Button>

            <Button variant='contained' color='primary' onClick={()=>toggleTeamManager('manage-teams')}
            style={{ width: 'fit-content'}}> Manage Teams </Button>
             </div>
                 
            <Button variant='contained' color='primary' style={{ width: 'fit-content', justifySelf: 'end', marginRight:'2%'}} 
            onClick={() => toggleShow()}>{toShow === 'tasks' ?  'Show By Members' :  'Show By Teams'}</Button>
            
            </div>
<hr/>
            {manageTeams ? <TeamHandler/> : null}
            
            {showAut ? <div className="aut">
                Hello Sunday.com, <br></br>
                Please notify me when task with the name  
                <NativeSelect id="select" value={taskInput} onChange={(e) => settaskInput(e.target.value)}>
                <option></option>
                {alltasks.map((t, i) => <option key={i}>{
                // t.taskId + '  ' +
                 t.taskName}</option>)}
                </NativeSelect><br></br> status change to  <NativeSelect id="select" value={statusInput} onChange={(e) => setstatusInput(e.target.value)}>
                    <option></option>
                    {statusArr.map((t, i) => <option key={i}>{t}</option>)}
                </NativeSelect>.<br></br>     
                <Button variant='contained' color='primary' onClick={()=>trackTask()}
                style={{ width: '40px', marginLeft: '520px', marginTop: '3%', marginBottom: '-1%'}}> Ok </Button>

            </div> : null }

            {toShow === 'tasks' ? <TeamsByTasks /> : <TeamsByMembers />}

        </div>
    );
}))

export default Teams;