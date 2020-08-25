import React from 'react';
import { observer, inject } from 'mobx-react';
import { useState } from 'react';
import Axios from 'axios';
import { useEffect } from 'react';
import { InputLabel, NativeSelect, TextField, Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
const capitalize = require('capitalize')

// const API_URL = 'http://localhost:3200'
const API_URL = ''


const TeamHandler = inject('usernamesStore', 'user', 'teamsStore')(observer((props) => {

    const usernames = props.usernamesStore.usernames.map(u => u.username)

    const [teamsObj, setTeamsObj] = useState([])
    const [teamInput, setTeam] = useState('')
    const [teams, setTeams] = useState([])
    const [member, setMember] = useState('')
    const [memberToDelete, setMemberToDelete] = useState('')

    const [newTeamInput, setTeamInput] = useState('')
    const [dltTeamInput, setDeleteTeamInput] = useState('')
    // eslint-disable-next-line
    const [team, setTeammm] = useState(props.teamsStore.teams.find(t => t.name == teamInput))

    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarStatus, setSnackbarStatus] = useState('')

    // eslint-disable-next-line
    const getContenders = () => {
        const members = team.members
        const contenders = usernames.filter(u => !members.includes(u))
        return contenders
    }

    const addTeam = async () => {
        if (!newTeamInput.length) {
            setSnackbarMessage('Enter a name for the team')
            setSnackbarStatus('error')
            setOpenSnackbar(true)
            return
        }
        const newTeam = capitalize(newTeamInput)
        // const newTeam = newTeamInput
        await props.teamsStore.addTeam(newTeam, localStorage.getItem('userId'))
        setSnackbarMessage(`Team: ${newTeam} was Added Successfully`)
        setSnackbarStatus('success')
        setOpenSnackbar(true)
        setTeamInput('')
        await props.teamsStore.getTeams(localStorage.getItem('userId'))
        const t = props.teamsStore.teams.find(t => t.name === teamInput)
        setTeammm(t)
        getTeams()
    }


    // const [newTeamInput, setTeamInput] = useState('')
    // const [dltTeamInput, setDeleteTeamInput] = useState('')
    const deleteTeam = async () => {
        if (!dltTeamInput.length) {
            setSnackbarMessage('Enter a name for the team')
            setSnackbarStatus('error')
            setOpenSnackbar(true)
            return
        }
        const teamToDelete = capitalize(dltTeamInput)
        await props.teamsStore.deleteTeam(teamToDelete, localStorage.getItem('userId'))
        setSnackbarMessage(`Team: ${teamToDelete} was Deleted Successfully`)
        setSnackbarStatus('success')
        setOpenSnackbar(true)
        setTeamInput('')
        await props.teamsStore.getTeams(localStorage.getItem('userId'))
        const t = props.teamsStore.teams.find(t => t.name === teamInput)
        setTeammm(t)
        getTeams()
    }


    // const getTeams = async () => {
    //     const res = await Axios.get(`http://localhost:3200/teams/${localStorage.getItem('userId')}`)
    //     setTeamsObj([...teamsObj, ...res.data])
    //     setTeams(res.data.map(t => t.teamName))
    // }

    // useEffect(getTeams, [])
    const getTeams = async () => {
        const res = await Axios.get(`${API_URL}/teams/${localStorage.getItem('userId')}`)
        setTeamsObj([...teamsObj, ...res.data])
        setTeams(res.data.map(t => t.teamName))
    }
    
    useEffect(
        () => {
        getTeams()
        // eslint-disable-next-line
    }, [team])



    const addMemberToTeam = async () => {
        if(!teamInput.length){ 
            setSnackbarMessage(`Please pick a team!`)
            setSnackbarStatus('error')
            setOpenSnackbar(true)
            setTeamInput('')
            return
        } 
        if(!member.length){
            setSnackbarMessage(`Please pick a member!`)
            setSnackbarStatus('error')
            setOpenSnackbar(true)
            setTeamInput('')
            return
        }
        const teamId = teamsObj.find(t => t.teamName === teamInput).teamId

        await Axios.post(`${API_URL}/teamsusers/${teamId}/${member}`)
        props.teamsStore.getTeams(localStorage.getItem('userId'))

        setSnackbarMessage(`${member} was added to ${teamInput} Successfully`)
        setSnackbarStatus('success')
        setOpenSnackbar(true)
        setTeamInput('')
    }

    const removeMemberFromTeam = async () => {
        if(!teamInput.length){ 
            setSnackbarMessage(`Please pick a team!`)
            setSnackbarStatus('error')
            setOpenSnackbar(true)
            setTeamInput('')
            return
        } 
        if(!member.length){
            setSnackbarMessage(`Please pick a member!`)
            setSnackbarStatus('error')
            setOpenSnackbar(true)
            setTeamInput('')
            return
        }
        const response = await Axios.get(`${API_URL}/userid/${memberToDelete}`)
        const idToDelete = response.data.userId

        await Axios.post(`${API_URL}/members/${teamInput}/${idToDelete}`)
        props.teamsStore.getTeams(localStorage.getItem('userId'))

        setSnackbarMessage(`${member} was deleted from ${teamInput} Successfully`)
        setSnackbarStatus('success')
        setOpenSnackbar(true)
        setTeamInput('')
    }


    return (
        <div>
        <div style={{ marginLeft: '2%', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div id="add-dekete-team" style={{marginTop: '2%'}}>
                <p style={{ fontStyle: 'italic'}}>Add Team:</p>
                <div id="add-team-box" style={{display: 'flex' }}>
                    <TextField id="category-input" label="New Team" type="text" variant="outlined"
                        style={{ width: '14vw', height: '8vh'}}
                        value={newTeamInput} onChange={(e) => setTeamInput(e.target.value)} />
                    <Button variant='contained' color='primary' onClick={addTeam} style={{marginLeft: '2%', width: '11vw', height: '8vh' }}> Add Team </Button>
                </div>
                <div id="delete-team-box" style={{marginTop: '5%'}}>
                    <p style={{ fontStyle: 'italic'}}>Delete Team:</p>
                    <InputLabel htmlFor="select">Choose Team</InputLabel>
                    <NativeSelect id="select" value={dltTeamInput} 
                    style={{ width: '14vw', height: '8vh'}} onChange={(e) => setDeleteTeamInput(e.target.value)}>
                        <option></option>
                        {teams.map((t, i) => <option key={i}>{t}</option>)}
                    </NativeSelect>
                    <Button variant='contained' color='primary' onClick={deleteTeam} style={{marginLeft: '2%', width: '11vw', height: '8vh' }}> Delete Team </Button>
                </div>

             </div>

            <div id="edit-team">
                <p style={{ fontStyle: 'italic'}}>Edit Team:</p>
                <InputLabel htmlFor="select">Choose A Team</InputLabel>
                <NativeSelect id="select" value={teamInput} onChange={(e) => setTeam(e.target.value)}
                style={{ width: '14vw', height:'5vh'}}>
                    <option></option>
                    {teams.map((t, i) => <option key={i}>{t}</option>)}
                </NativeSelect><br></br>

                <p style={{ fontStyle: 'italic'}}>Add Member:</p>
                <InputLabel htmlFor="select">Choose A Member</InputLabel>
                <NativeSelect id="select" value={member} onChange={(e) => setMember(e.target.value)}
                style={{ width: '14vw', height:'5vh'}}>
                    <option></option>
                
                    {teamInput ? props.usernamesStore.usernames.map(u => u.username).map((u, i) => <option key={i}>{u}</option>) : null}
                    
                    {/* {teamInput ?  props.usernamesStore.usernames.map(u => u.username).filter(u => !props.teamsStore.teams.find(t => t.name == teamInput).members.includes(u)).map((u, i) => <option key={i}>{u}</option>) : null} */}

                    {/* {teamInput ? getContenders().map((u, i) => <option key={i}>{u}</option>) : null} */}
                </NativeSelect>
                <Button variant='contained' color='primary' style={{marginLeft: '2%', height: '5vh', width: '7vw'}} onClick={() => addMemberToTeam()}>Add</Button>

                <p style={{ fontStyle: 'italic'}}>Remove Member:</p>
                <InputLabel htmlFor="select">Choose A Member</InputLabel>
                <NativeSelect id="select" value={memberToDelete} onChange={(e) => setMemberToDelete(e.target.value)}
                style={{ width: '14vw', marginBottom: '2%', height:'5vh'}}>
                    <option></option>
                    {teamInput ? props.teamsStore.teams.find(t => t.name === teamInput).members.map((u, i) => <option key={i}>{u}</option>) : null}
                </NativeSelect>
                <Button  variant='contained' color='primary' style={{marginLeft: '2%', height:'5vh', width: '7vw'}} onClick={() => removeMemberFromTeam()}>Remove</Button>
            </div>


            <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={()=>setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarStatus} variant="filled">
                    {snackbarMessage}
                </Alert>
            </Snackbar>

        </div>
        <hr/>

        </div>
    );
}))

export default TeamHandler;